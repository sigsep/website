# Introduction

[![status](https://joss.theoj.org/papers/571753bc54c5d6dd36382c3d801de41d/status.svg)](https://joss.theoj.org/papers/571753bc54c5d6dd36382c3d801de41d) [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1mijF0zGWxN-KaxTnd0q6hayAlrID5fEQ) [![Gitter](https://badges.gitter.im/sigsep/open-unmix.svg)](https://gitter.im/sigsep/open-unmix?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) [![Google group : Open-Unmix](https://img.shields.io/badge/discuss-on%20google%20groups-orange.svg)](https://groups.google.com/forum/#!forum/open-unmix)


### Open-Unmix - A Reference Implementation for Music Source Separation

__Open-Unmix__, is a deep neural network reference implementation for music source separation, applicable for researchers, audio engineers and artists. __Open-Unmix__ provides ready-to-use models that allow users to separate pop music into four stems: __vocals__, __drums__, __bass__ and the remaining __other__ instruments.

Although __open-unmix__ reaches state of the art separation performance as of September, 2019 (See [Evaluation](#Evaluation)), the design choices for it favored simplicity over performance to promote clearness of the code and to have it serve as a __baseline__ for future research. The results are comparable/better to those of `UHL1`/`UHL2` which obtained the best performance over all systems trained on MUSDB18 in the [SiSEC 2018 Evaluation campaign](https://sisec18.unmix.app).
We designed the code to allow researchers to reproduce existing results, quickly develop new architectures and add own user data for training and testing. We favored framework specifics implementations instead of having a monolithic repository with common code for all frameworks.

The model is available for three different frameworks. However, the pytorch implementation serves as the reference version that includes pre-trained networks trained on the [MUSDB18](https://sigsep.github.io/datasets/musdb.html) dataset.

* [open-unmix for pytorch <Badge text="Reference" type="tip"/>](https://github.com/sigsep/open-unmix-pytorch)
* [colab notebook](https://colab.research.google.com/drive/1mijF0zGWxN-KaxTnd0q6hayAlrID5fEQ)
* [open-unmix for nnabla](https://github.com/sigsep/open-unmix-nnabla) 
* [open-unmix for tensorflow <Badge text="to be released" type="warn"/>](https://github.com/sigsep/open-unmix-tensorflow) 

## Paper 

[![status](https://joss.theoj.org/papers/571753bc54c5d6dd36382c3d801de41d/status.svg)](https://joss.theoj.org/papers/571753bc54c5d6dd36382c3d801de41d)

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
[NNabla](https://github.com/sigsep/open-unmix-nnabla) and plan to
release a port for Tensorflow 2.0, once the framework is released. Note
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
-   **not a package**: The software is composed of largely independent
    and self-containing parts, keeping it easy to use and easy to
    change.
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

## Using the PyTorch version

For installation we recommend to use the [Anaconda](https://anaconda.org/) python distribution. To create a conda environment for _open-unmix_, simply run:

`conda env create -f environment-X.yml` where `X` is either [`cpu-linux`, `gpu-linux-cuda10`, `cpu-osx`], depending on your system. For now, we haven't tested windows support.

We provide two pre-trained models:

* __`umxhq` (default)__  trained on [MUSDB18-HQ](https://sigsep.github.io/datasets/musdb.html#uncompressed-wav) which comprises the same tracks as in MUSDB18 but un-compressed. This allows outputting separated signals with a full bandwidth of 22050 Hz.

  [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3370489.svg)](https://doi.org/10.5281/zenodo.3370489)

* __`umx`__ is trained on the regular [MUSDB18](https://sigsep.github.io/datasets/musdb.html#compressed-stems) which is bandwidth limited to 16 kHz due to AAC compression. This model should be used for comparison with other (older) methods for evaluation in [SiSEC18](sisec18.unmix.app).

  [![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.3370486.svg)](https://doi.org/10.5281/zenodo.3370486)

To separate audio files (`wav`, `flac`, `ogg` - but not `mp3`) files just run:

```bash
python test.py input_file.wav --model umxhq
```

A more detailed list of the parameters used for the separation is given in the [inference.md](https://github.com/sigsep/open-unmix-pytorch/blob/master/docs/inference.md) document.
We provide a [jupyter notebook on google colab](https://colab.research.google.com/drive/1mijF0zGWxN-KaxTnd0q6hayAlrID5fEQ) to 
experiment with open-unmix and to separate files online without any installation setup.

### Torch.hub

The pre-trained models can be loaded from other pytorch based repositories using torch.hub.load:

```python
torch.hub.load('sigsep/open-unmix-pytorch', 'umxhq', target='vocals')
```

### Evaluation using `museval`

To perform evaluation in comparison to other SISEC systems, you would need to install the `museval` package using

```
pip install museval
```

and then run the evaluation using

```
python eval.py --outdir /path/to/musdb/estimates --evaldir /path/to/museval/results
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
