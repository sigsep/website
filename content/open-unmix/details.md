# Technical Details

![](https://docs.google.com/drawings/d/e/2PACX-1vQ1WgVU4PGeEqTQ26j-2RbwaN9ZPlxabBI5N7mYqOK66VjT96UmT9wAaX1s6u6jDHe0ARfAo9E--lQM/pub?w=1918&h=703)

### Datasets and Dataloaders

When designing a machine-learnig based method, our first step is to
encapsulate cleanly the data-processing aspects.

-   **Datasets**: we support the *MUSDB18* which is the most established
    dataset for music separation, that we released some years ago (Rafii
    et al. 2017). The dataset contains 150 full-lengths music tracks
    (\~10h duration) of different musical styles along with their
    isolated `drums`, `bass`, `vocals` and `others` stems. *MUSDB18* is
    split into *training* (100 songs) and *test* subsets (50 songs). All
    files from the *MUSDB18* dataset are encoded in the Native
    Instruments [stems
    format](https://www.native-instruments.com/en/specials/stems/)
    (.mp4) to reduce the file size. It is a multitrack format composed
    of 5 stereo streams, each one encoded in AAC `@`256kbps. Since AAC
    is bandwidth limited to 16 kHz instead of 22 kHz for full bandwidth,
    any model trained on *MUSDB18* would not be able to output
    high-quality content. As part of the release of *Open-Unmix*, we
    also released *MUSDB18-HQ* (Rafii et al. 2019), which is the
    uncompressed, full-quality version of the *MUSDB18* dataset.
-   **Efficient data-loading and transforms**: since preparing the
    batches for training is often the efficiency bottleneck, extra-care
    was taken to optimize speed and performance. Here, we use a
    framework-specific data loading API instead of a generic module. For
    all frameworks we use the builtin STFT transform operator, when
    available, that works on the GPU to improve performance (See (Choi,
    Joo, and Kim 2017)).
-   **Essential augmentations**: the data augmentation techniques we
    adopted here for source separation are described in (Uhlich et
    al. 2017). They enable to attain good performance even though the
    audio datasets such as *MUSDB18* are often of limited size.
-   **Post processing**: is an important step that helps to improve the
    overall performance by combining the outputs of all instrument DNNs.
    We use a multichannel Wiener filter (MWF) as was proposed in
    (Nugraha, Liutkus, and Vincent 2016; Sivasankaran et al. 2015) and
    which we open-sourced in the
    [`sigsep.norbert`](https://github.com/sigsep/norbert) repository

### Model

The system is trained to predict a separated source from the observation
of its mixture with other sources. The corresponding training is done in
a *discriminative* way, i.e. through a dataset of mixtures paired with
their true separated sources. These are used as ground truth targets
from which gradients are computed. Although alternative ways to train a
separation system have emerged recently, notably through *generative*
strategies trained through adversarial cost functions, they still did
not lead to comparable performance. Even if we acknowledge that such an
approach could, in theory, allow scaling the size of training data since
it can be done in an *unpaired* manner, we feel that this direction is
still in progress and cannot be considered state-of-the-art today. That
said, the *Open-Unmix* system can easily be extended to such generative
training, and the community is much welcome to exploit it for that
purpose.

![Separation
network\label{separation_network}](https://docs.google.com/drawings/d/e/2PACX-1vTPoQiPwmdfET4pZhue1RvG7oEUJz7eUeQvCu6vzYeKRwHl6by4RRTnphImSKM0k5KXw9rZ1iIFnpGW/pub?w=959&h=308)

The constitutive parts of the actual deep model used in *Open-Unmix*
only comprise very classical elements, depicted in the Figure
 above.

-   *LSTM*: The core of *Open-Unmix* is a three-layer bidirectional LSTM
    network (Hochreiter and Schmidhuber 1997). Due to its recurrent
    nature, the model can be trained and evaluated on arbitrary length
    of audio signals. Since the model takes information from the past
    and future simultaneously, the model cannot be used in an
    online/real-time manner. An uni-directional model can easily be
    trained.
-   *Fully connected time-distributed layers* are used for
    dimensionality reduction and augmentation, thus encoding/decoding
    the input and output. They allow control over the number of
    parameters of the model and prove to be crucial for generalization.
-   *Skip connections* are used in two ways: i/ the output to recurrent
    layers are augmented with their input, and this proved to help
    convergence. ii/ The output spectrogram is computed as an
    element-wise multiplication of the input. This means that the system
    has to learn *how much each TF bin does belong to the target source*
    and not the *actual* value of that bin. This is *critical* for
    obtaining good performance and combining the estimates given for
    several targets, as done in *Open-unmix*.
-   *Non linearities* are of three kinds: i/ rectified linear units
    (ReLU) allow intermediate layers to comprise nonnegative
    activations, which long proved effective in TF modeling. ii/ `tanh`
    are known to be necessary for good training of LSTM model, notably
    because they avoid exploding input and output. iii/ a `sigmoid`
    activation is chosen before masking, to mimic the way legacy systems
    take the outputs as a *filtering* of the input.
-   *Batch normalization* long proved important for stable training,
    because it makes the different batches more similar in terms of
    distributions. In the case of audio where signal dynamics can be
    very important, this is crucial.

Note that the model can process and predict multichannel spectrograms by
stacking features. Furthermore, please note that the input and output to
the *Open-Unmix* core deep model are magnitude spectrograms. Although
using phase as additional input feature (Muth et al. 2018) or estimating
the instrument phase (Le Roux et al. 2019; Takahashi et al. 2018) are
interesting approaches, they have not yet been submitted to
international evaluation campaigns like SiSEC for music separation.