# Introduction

[![status](https://joss.theoj.org/papers/571753bc54c5d6dd36382c3d801de41d/status.svg)](https://joss.theoj.org/papers/571753bc54c5d6dd36382c3d801de41d) [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1mijF0zGWxN-KaxTnd0q6hayAlrID5fEQ) [![Gitter](https://badges.gitter.im/sigsep/open-unmix.svg)](https://gitter.im/sigsep/open-unmix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)   


### Open-Unmix - A Reference Implementation for Music Source Separation

__Open-Unmix__, is a deep neural network reference implementation for music source separation, applicable for researchers, audio engineers and artists. __Open-Unmix__ provides ready-to-use models that allow users to separate pop music into four stems: __vocals__, __drums__, __bass__ and the remaining __other__ instruments.

Although __open-unmix__ reaches state of the art separation performance as of September, 2019 (See [Evaluation](#Evaluation)), the design choices for it favored simplicity over performance to promote clearness of the code and to have it serve as a __baseline__ for future research. The results are comparable/better to those of `UHL1`/`UHL2` which obtained the best performance over all systems trained on MUSDB18 in the [SiSEC 2018 Evaluation campaign](https://sisec18.unmix.app).
We designed the code to allow researchers to reproduce existing results, quickly develop new architectures and add own user data for training and testing. We favored framework specifics implementations instead of having a monolithic repository with common code for all frameworks.

The model is available for three different frameworks. However, the pytorch implementation serves as the reference version that includes pre-trained networks trained on the [MUSDB18](https://sigsep.github.io/datasets/musdb.html) dataset.

* [Code Repository](https://github.com/sigsep/open-unmix-pytorch)
* [Colab notebook](https://colab.research.google.com/drive/1mijF0zGWxN-KaxTnd0q6hayAlrID5fEQ)


## ⭐️ News 

- 03/07/2021: We added `umxl`, a model that was trained on extra data which significantly improves the performance, especially generalization.
- 14/02/2021: We released the new version of open-unmix as a python package. This comes with: a fully differentiable version of [norbert](https://github.com/sigsep/norbert), improved audio loading pipeline and large number of bug fixes. See [release notes](https://github.com/sigsep/open-unmix-pytorch/releases/) for further info.

- 06/05/2020: We added a pre-trained speech enhancement model `umxse` provided by Sony.

- 13/03/2020: Open-unmix was awarded 2nd place in the [PyTorch Global Summer Hackathon 2020](https://devpost.com/software/open-unmix).

## Paper 

Open-unmix is presented in a paper that has been published in the Journal of Open Source Software. 
You may download the paper PDF [here](https://www.theoj.org/joss-papers/joss.01667/10.21105.joss.01667.pdf)

If you use open-unmix for your research, please cite it through the references [below](#references).

## Design Choices

The design choices made for *Open-Unmix* have sought to reach two
somewhat contradictory objectives. Its first aim is to have
state-of-the-art performance, and its second aim is to still be easily
understandable, so that it can serve as a basis for research to allow
improved performance in the future. In the past, many researchers faced
difficulties in pre- and post-processing that could be avoided by
sharing domain knowledge. Our aim was thus to design a system that
allows researchers to focus on A) new representations and B) new
architectures.

### Framework specific vs. framework agnostic

We choose *pytorch* to serve as a reference implementation due to its
balance between simplicity and modularity.
Furthermore, we already ported the core model to
[NNabla](https://github.com/sigsep/open-unmix-nnabla). Note
that the ports will not include pre-trained models as we cannot make
sure the ports would yield identical results, thus leaving a single
baseline model for researchers to compare with.

### "MNIST-like"

Keeping in mind that the learning curve can be quite steep in audio
processing, we did our best for *Open-unmix* to be:

-   **simple to extend**: The pre/post-processing, data-loading,
    training and models part of the code are isolated and easy to
    replace/update. In particular, a specific effort was done to make it
    easy to replace the model.
-   **hackable (MNIST like)**: Due to our objective of making it easier
    for machine-learning experts to try out music separation, we did our
    best to stick to the philosophy of baseline implementations for this
    community. In particular, *Open-unmix* mimics the famous MNIST
    example, including the ability to instantly start training on a
    dataset that is automatically downloaded.

### Reproducible

Releasing *Open-Unmix* is first and foremost an attempt to provide a
reliable implementation sticking to established programming practice as
were also proposed in (McFee et al. 2018). In particular:

-   **reproducible code**: everything is provided to exactly reproduce
    our experiments and display our results.
-   **pre-trained models**: we provide pre-trained weights that allow a
    user to use the model right away or fine-tune it on user-provided
    data (Stöter and Liutkus 2019a, 2019b).
-   **tests**: the release includes unit and regression tests, useful to
    organize future open collaboration through pull requests.

## 🏁 Getting started

### Installation

`openunmix` can be installed from pypi using:

```
pip install openunmix
```

Note, that the pypi version of openunmix uses [torchaudio] to load and save audio files. To increase the number of supported input and output file formats (such as STEMS export), please additionally install [stempeg](https://github.com/faroit/stempeg).

Training is not part of the open-unmix package, please follow [docs/train.md] for more information.

#### Using Docker

We also provide a docker container. Performing separation of a local track in `~/Music/track1.wav` can be performed in a single line:

```
docker run -v ~/Music/:/data -it faroit/open-unmix-pytorch umx "/data/track1.wav" --outdir /data/track1
```

### Pre-trained models

We provide three core pre-trained music separation models. All three models are end-to-end models that take waveform inputs and output the separated waveforms.

* __`umxl`__  trained on private stems dataset of compressed stems. __Note, that the weights are only licensed for non-commercial use (CC BY-NC-SA 4.0).__

  [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.5069601.svg)](https://doi.org/10.5281/zenodo.5069601)

* __`umxhq` (default)__  trained on [MUSDB18-HQ](https://sigsep.github.io/datasets/musdb.html#uncompressed-wav) which comprises the same tracks as in MUSDB18 but un-compressed which yield in a full bandwidth of 22050 Hz.

  [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3370489.svg)](https://doi.org/10.5281/zenodo.3370489)

* __`umx`__ is trained on the regular [MUSDB18](https://sigsep.github.io/datasets/musdb.html#compressed-stems) which is bandwidth limited to 16 kHz do to AAC compression. This model should be used for comparison with other (older) methods for evaluation in [SiSEC18](sisec18.unmix.app).

  [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3370486.svg)](https://doi.org/10.5281/zenodo.3370486)

Furthermore, we provide a model for speech enhancement trained by [Sony Corporation](link)

* __`umxse`__ speech enhancement model is trained on the 28-speaker version of the [Voicebank+DEMAND corpus](https://datashare.is.ed.ac.uk/handle/10283/1942?show=full).

  [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3786908.svg)](https://doi.org/10.5281/zenodo.3786908)

All four models are also available as spectrogram (core) models, which take magnitude spectrogram inputs and ouput separated spectrograms.
These models can be loaded using `umxl_spec`, `umxhq_spec`, `umx_spec` and `umxse_spec`.

To separate audio files (`wav`, `flac`, `ogg` - but not `mp3`) files just run:

```bash
umx input_file.wav --model umxl
```

A more detailed list of the parameters used for the separation is given in the [inference.md](/docs/inference.md) document.

We provide a [jupyter notebook on google colab](https://colab.research.google.com/drive/1mijF0zGWxN-KaxTnd0q6hayAlrID5fEQ) to experiment with open-unmix and to separate files online without any installation setup.

### Using pre-trained models from within python

We implementes several ways to load pre-trained models and use them from within your python projects:

#### When the package is installed

Loading a pre-trained models is as simple as loading

```python
separator = openunmix.umxhq(...)
```
#### torch.hub

We also provide a torch.hub compatible modules that can be loaded. Note that this does _not_ even require to install the open-unmix packagen and should generally work when the pytorch version is the same.

```python
separator = torch.hub.load('sigsep/open-unmix-pytorch', 'umxhq', device=device)
```

Where, `umxhq` specifies the pre-trained model. 

#### Performing separation

With a created separator object, one can perform separation of some `audio` (torch.Tensor of shape `(channels, length)`, provided as at a sampling rate `separator.sample_rate`) through:

```python
estimates = separator(audio, ...)
# returns estimates as tensor
```

Note that this requires the audio to be in the right shape and sampling rate. For convenience we provide a pre-processing in `openunmix.utils.preprocess(..`)` that takes numpy audio and converts it to be used for open-unmix.

To perform model loading, preprocessing and separation in one step, just use:

```python
from openunmix import separate
estimates = separate.predict(audio, ...)
```

## Contribute / Support

_open-unmix_ is a community focused project, we therefore encourage the community to submit bug-fixes and requests for technical support through [github issues](https://github.com/sigsep/open-unmix-pytorch/issues/new/choose). For more details of how to contribute, please follow our [`CONTRIBUTING.md`](https://github.com/sigsep/open-unmix-pytorch/blob/master/CONTRIBUTING.md).

For support and help, please use the [gitter chat](https://gitter.im/sigsep/open-unmix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) or the [google groups](https://groups.google.com/forum/#!forum/open-unmix) forum.


## References

<summary>If you use open-unmix for your research – Cite Open-Unmix</summary>
  
```latex
@article{stoter19,  
  author        = {F.-R. St\\"oter and 
                   S. Uhlich and 
                   A. Liutkus and 
                   Y. Mitsufuji},  
  title         = {Open-Unmix - A Reference Implementation 
                   for Music Source Separation},
  journal       = {Journal of Open Source Software},  
  year          = 2019,
  doi           = {10.21105/joss.01667},
  url           = {https://doi.org/10.21105/joss.01667}
}
```

</p>


<summary>If you use the MUSDB dataset for your research - Cite the MUSDB18 Dataset</summary>
<p>

```latex
@misc{MUSDB18,
  author       = {Zafar Rafii and
                  Antoine Liutkus and
                  Fabian-Robert St{\"o}ter and
                  Stylianos Ioannis Mimilakis and
                  Rachel Bittner},
  title        = {The {MUSDB18} corpus for music separation},
  month        = dec,
  year         = 2017,
  doi          = {10.5281/zenodo.1117372},
  url          = {https://doi.org/10.5281/zenodo.1117372}
}
```

</p>



<summary>If compare your results with SiSEC 2018 Participants - Cite the SiSEC 2018 LVA/ICA Paper</summary>
<p>

```latex
@inproceedings{SiSEC18,
  author       = {Fabian-Robert St{\"o}ter and
                  Antoine Liutkus and
                  Nobutaka Ito},
  title        = {The 2018 Signal Separation Evaluation Campaign},
  booktitle    = {Latent Variable Analysis and Signal Separation},
  year         = 2018,
  pages        = {293--30}
}
```

</p>


⚠️ Please note that the official acronym for _open-unmix_ is **UMX**.
### Authors

[Fabian-Robert Stöter](https://www.faroit.com/), [Antoine Liutkus](https://github.com/aliutkus), Inria and LIRMM, Montpellier, France

### License

MIT

### Copyright

<p></p>
<img src="./logo_INRIA.svg" width="250">

### Funding

This  work  was  partly  supported  by  the  research  programme  KAMoulox(ANR-15-CE38-0003-01)  funded  by  ANR,  the  French  State  agency  for  re-search
<p></p>
<img src="./anr.jpg" width="100">
