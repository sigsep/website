---
sidebar: auto
---

# Literature

In this article, we describe the basic ideas of existing methods for musical source separation (and specifically Lead/Accompaniment Separation) classified into three main categories: signal processing, audio
modeling and probability theory. The interested reader is strongly
encouraged to delve into the many online courses or textbooks available
for a more detailed presentation of these topics, such
as \[[12](#ref-zolzer11)\], \[[13](#ref-muller2015)\] for signal
processing, \[[9](#ref-loizou13)\] for speech modeling, and
\[[14](#ref-jaynes2003probability)\], \[[15](#ref-cappe2005)\] for
probability theory.

:::tip CITE
This article is based on [a publication in the IEEE Journal of Transactions](https://ieeexplore.ieee.org/document/8336997/).
If you want to cite this article, please use the following reference.

```
@ARTICLE{rafii18,
  author={Z. Rafii and A. Liutkus and
          F. R. Stöter and S. I. Mimilakis
          and D. FitzGerald and B. Pardo},
  journal={IEEE/ACM Transactions on Audio, Speech, and Language Processing},
  title={An Overview of Lead and Accompaniment Separation in Music},
  year={2018},
  volume={26},
  number={8},
  pages={1307-1335},
  doi={10.1109/TASLP.2018.2825440},
  ISSN={2329-9290},
  month={Aug}
}

```
:::

### Signal processing

Sound is a series of pressure waves in the air. It is recorded as a
*waveform*, a time-series of measurements of the displacement of the
microphone diaphragm in response to these pressure waves. Sound is
reproduced if a loudspeaker diaphragm is moved according to the recorded
waveform. Multichannel signals simply consist of several waveforms,
captured by more than one microphone. Typically, music signals are
stereophonic, containing two waveforms.

Microphone displacement is typically measured at a fixed  *sampling
frequency*. In music processing, it is common to have sampling
frequencies of \(44.1\) kHz (the sample frequency on a compact disc) or
\(48\) kHz, which are higher than the typical sampling rates of
\(16\) kHz or \(8\) kHz used for speech in telephony. This is because
musical signals contain much higher frequency content than speech and
the goal is aesthetic beauty in addition to basic intelligibility.

A time-frequency (TF) representation of sound is a matrix that encodes
the time-varying *spectrum* of the waveform. Its entries are called
TF *bins* and encode the varying spectrum of the waveform for all time
frames and frequency channels. The most commonly-used TF representation
is the short time Fourier transform (STFT) \[[16](#ref-mcaulay86)\],
which has complex entries: the angle accounts for the phase, i.e., the
actual shift of the corresponding sinusoid at that time bin and
frequency bin, and the magnitude accounts for the amplitude of that
sinusoid in the signal. The magnitude (or power) of the STFT is called
*spectrogram*. When the mixture is multichannel, the TF representation
for each channel is computed, leading to a three-dimensional array:
frequency, time and channel.

A TF representation is typically used as a first step in processing the
audio because sources tend to be less overlapped in the TF
representation than in the waveform \[[17](#ref-rickard02)\]. This makes
it easier to select portions of a mixture that correspond to only a
single source. An STFT is typically used because it can be inverted back
to the original waveform. Therefore, modifications made to the STFT can
be used to create a modified waveform. Generally, a linear mixing
process is considered, i.e., the mixture signal is equal to the sum of
the source signals. Since the Fourier transform is a linear operation,
this equality holds for the STFT. While that is not the case for the
magnitude (or power) of the STFT, it is commonly assumed that the
spectrograms of the sources sum to the spectrogram of the mixture.

In many methods, the separated sources are obtained by *filtering* the
mixture. This can be understood as performing some equalization on the
mixture, where each frequency is attenuated or kept intact. Since both
the lead and the accompaniment signals change over time, the filter also
changes. This is typically done using a TF *mask*, which, in its
simplest form, is defined as the gain between \(0\) and \(1\) to apply
on each element of the TF representation of the mixture (e.g., an STFT)
in order to estimate the desired signal. Loosely speaking, it can be
understood as an equalizer whose setting changes every few milliseconds.
After multiplication of the mixture by a mask, the separated signal is
recovered through an inverse TF transform. In the multichannel setting,
more sophisticated filters may be designed that incorporate some delay
and combine different channels; this is usually called *beamforming*. In
the frequency domain, this is often equivalent to using complex matrices
to multiply the mixture TF representation with, instead of just scalars
between \(0\) and \(1\).

In practice, masks can be designed to filter the mixture in several
ways. One may estimate the spectrogram for a single source or component,
e.g., the accompaniment, and subtract it from the mixture spectrogram,
e.g., in order to estimate the lead \[[18](#ref-boll1979)\]. Another way
would be to estimate separate spectrograms for both lead and
accompaniment and combine them to yield a mask. For instance, a TF mask
for the lead can be taken as the proportion of the lead spectrogram over
the sum of both spectrograms, at each TF bin. Such filters are often
called *Wiener filters* \[[19](#ref-wiener1975)\] or *ratio masks*. How
they are calculated may involve some additional techniques like
exponentiation and may be understood according to assumptions regarding
the underlying statistics of the sources. For recent work in this area,
and many useful pointers in designing such masks, the reader is referred
to \[[20](#ref-liutkus15c)\].

### Audio and speech modeling

It is typical in audio processing to describe audio waveforms as
belonging to one of two different categories, which are *sinusoidal
signals* — or pure tones — and *noise*. Actually, both are just the two
extremes in a continuum of varying *predictability*: on the one hand,
the shape of a sinusoidal wave in the future can reliably be guessed
from previous samples. On the other hand, white noise is *defined* as an
unpredictable signal and its spectrogram has constant energy everywhere.
Different noise profiles may then be obtained by attenuating the energy
of some frequency regions. This in turn induces some predictability in
the signal, and in the extreme case where all the energy content is
concentrated in one frequency, a pure tone is obtained.

A waveform may always be modeled as some *filter* applied on some
*excitation signal*. Usually, the filter is assumed to vary smoothly
across frequencies, hence modifying only what is called *the spectral
envelope* of the signal, while the excitation signal comprises the rest.
This is the basis for the *source-filter* model \[[21](#ref-fant70)\],
which is of great importance in speech modeling, and thus also in vocal
separation. As for speech, the filter is created by the shape of the
vocal tract. The excitation signal is made of the glottal pulses
generated by the vibration of the vocal folds. This results into
*voiced* speech sounds made of time-varying harmonic/sinusoidal
components. The excitation signal can also be the air flow passing
through some constriction of the vocal tract. This results into
*unvoiced*, noise-like, speech sounds. In this context, vowels are said
to be voiced and tend to feature many sinusoids, while some phonemes
such as fricatives are unvoiced and noisier.

A classical tool for dissociating the envelope from the excitation is
the *cepstrum* \[[22](#ref-bogert1963)\]. It has applications for
estimating the fundamental frequency \[[23](#ref-noll64)\],
\[[24](#ref-noll67)\], for deriving the Mel-frequency cepstral
coefficients (MFCC) \[[25](#ref-david80)\], or for filtering signals
through a so-called *liftering* operation \[[26](#ref-oppenheim69)\]
that enables modifications of either the excitation or the envelope
parts through the source-filter
paradigm.

<span id="fig:stylized_vocals_accompaniment" label="fig:stylized_vocals_accompaniment">\[fig:stylized\_vocals\_accompaniment\]</span>

An advantage of the source-filter model approach is indeed that one can
dissociate the pitched content of the signal, embodied by the position
of its harmonics, from its TF envelope which describes where the energy
of the sound lies. In the case of vocals, it yields the ability to
distinguish between the actual note being sung (pitch content) and the
phoneme being uttered (mouth and vocal tract configuration),
respectively. One key feature of vocals is they typically exhibit great
variability in fundamental frequency over time. They can also exhibit
larger *vibratos* (fundamental frequency modulations) and *tremolos*
(amplitude modulations) in comparison to other instruments, as seen in
the top spectrogram in
Figure [\[fig:stylized\_vocals\_accompaniment\]](#fig:stylized_vocals_accompaniment).

A particularity of musical signals is that they typically consist of
sequences of pitched notes. A sound gives the perception of having a
pitch if the majority of the energy in the audio signal is at
frequencies located at integer multiples of some fundamental frequency.
These integer multiples are called *harmonics*. When the fundamental
frequency changes, the frequencies of these harmonics also change,
yielding the typical comb spectrograms of harmonic signals, as depicted
in the top spectrogram in
Figure [\[fig:stylized\_vocals\_accompaniment\]](#fig:stylized_vocals_accompaniment).
Another noteworthy feature of sung melodies over simple speech is that
their fundamental frequencies are, in general, located at precise
frequency values corresponding to the musical key of the song. These
very peculiar features are often exploited in separation methods. For
simplicity reasons, we use the terms *pitch* and *fundamental frequency*
interchangeably throughout the paper.

### Probability theory

Probability theory \[[14](#ref-jaynes2003probability)\],
\[[27](#ref-durrett2010probability)\] is an important framework for
designing many data analysis and processing methods. Many of the methods
described in this article use it and it is far beyond the scope of this
paper to present it rigorously. For our purpose, it will suffice to say
that the *observations* consist of the mixture signals. On the other
hand, the *parameters* are any relevant feature about the source signal
(such as pitch or time-varying envelope) or how the signals are mixed
(e.g., the panning position). These parameters can be used to derive
estimates about the target lead and accompaniment signals.

We understand a probabilistic *model* as a function of both the
observations and the parameters: it describes how likely the
observations are, given the parameters. For instance, a flat spectrum is
likely under the noise model, and a mixture of comb spectrograms is
likely under a harmonic model with the appropriate pitch parameters for
the sources. When the observations are given, variation in the model
depends only on the parameters. For some parameter value, it tells how
likely the observations are. Under a harmonic model for instance, pitch
may be estimated by finding the pitch parameter that makes the observed
waveform as likely as possible. Alternatively, we may want to choose
between several possible models such as voiced or unvoiced. In such
cases, *model selection* methods are available, such as the Bayesian
information criterion (BIC) \[[28](#ref-schwarz78)\].

Given these basic ideas, we briefly mention two models that are of
particular importance. Firstly, the hidden Markov model
(HMM) \[[15](#ref-cappe2005)\], \[[29](#ref-rabiner89)\] is relevant
for time-varying observations. It basically defines several *states*,
each one related to a specific model and with some probabilities for
transitions between them. For instance, we could define as many states
as possible notes played by the lead guitar, each one associated with a
typical spectrum. The *Viterbi algorithm* is a dynamic programming
method which actually estimates the most likely sequence of states given
a sequence of observations \[[30](#ref-viterbi2006)\]. Secondly, the
Gaussian mixture model (GMM) \[[31](#ref-bishop96)\] is a way to
approximate any distribution as a weighted sum of Gaussians. It is
widely used in clustering, because it works well with the celebrated
Expectation-Maximization (EM) algorithm \[[32](#ref-dempster77)\] to
assign one particular cluster to each data point, while automatically
estimating the clusters parameters. As we will see later, many methods
work by assigning each TF bin to a given source in a similar way.

## Modeling the lead signal: harmonicity

![](https://docs.google.com/drawings/d/e/2PACX-1vS1ciSejDMm1qrkhaPSc9btYmTvnGc3p5XgxeFsI0De8I5IWYxR73ctpzu0E4Ud7S9KEWRHqcng__Q2/pub?w=592&h=403)

#### The approaches based on a *harmonic assumption* for vocals. In a first analysis step, the fundamental frequency of the lead signal is extracted. From it, a separation is obtained either by resynthesis (Section [3.1](#ssec:harmonicity-synthesis)), or by filtering the mixture (Section [3.2](#ssec:harmonicity-combfiltering)).](figures/Figure2.pdf)

As mentioned in Section [2.2](#ssec:audio_and_speech_models), one
particularity of vocals is their production by the vibration of the
vocal folds, further filtered by the vocal tract. As a consequence, sung
melodies are *mostly* harmonic, as depicted in
Figure [\[fig:stylized\_vocals\_accompaniment\]](#fig:stylized_vocals_accompaniment),
and therefore have a fundamental frequency. If one can track the pitch
of the vocals, one can then estimate the energy at the harmonics of the
fundamental frequency and reconstruct the voice. This is the basis of
the oldest methods (as well as some more recent methods) we are aware of
for separating the lead signal from a musical mixture.

Such methods are summarized in
Figure [\[fig:methods\_harmonicity\]](#fig:methods_harmonicity). In a
first step, the objective is to get estimates of the time-varying
fundamental frequency for the lead at each time frame. A second step in
this respect is then to track this fundamental frequency over time, in
other words, to find the best sequence of estimates, in order to
identify the melody line. This can done either by a suitable pitch
detection method, or by exploiting the availability of the score. Such
algorithms typically assume that the lead corresponds to the harmonic
signal with strongest amplitude. For a review on the particular topic of
melody extraction, the reader is referred to \[[33](#ref-salamon14)\].

From this starting point, we can distinguish between two kinds of
approaches, depending on how they exploit the pitch information.

### Analysis-synthesis approaches

The first option to obtain the separated lead signal is to resynthesize
it using a sinusoidal model. A sinusoidal model decomposes the sound
with a set of sine waves of varying frequency and amplitude. If one
knows the fundamental frequency of a pitched sound (like a singing
voice), as well as the spectral envelope of the recording, then one can
reconstruct the sound by making a set of sine waves whose frequencies
are those of the harmonics of the fundamental frequency, and whose
amplitudes are estimated from the spectral envelope of the audio. While
the spectral envelope of the recording is generally not exactly the same
as the spectral envelope of the target source, it can be a reasonable
approximation, especially assuming that different sources do not overlap
too much with each other in the TF representation of the mixture.

This idea allows for time-domain processing and was used in the earliest
methods we are aware of. In 1973, Miller proposed in
\[[34](#ref-miller73)\] to use the homomorphic vocoder
\[[35](#ref-oppenheim68)\] to separate the excitation function and
impulse response of the vocal tract. Further refinements include
segmenting parts of the signal as voiced, unvoiced, or silences using a
heuristic program and manual interaction. Finally, cepstral
liftering \[[26](#ref-oppenheim69)\] was exploited to compensate for
the noise or accompaniment.

Similarly, Maher used an analysis-synthesis approach
in \[[36](#ref-maher89)\], assuming the mixtures are composed of only
two harmonic sources. In his case, pitch detection was performed on the
STFT and included heuristics to account for possibly colliding
harmonics. He finally resynthesized each musical voice with a sinusoidal
model.

Wang proposed instantaneous and frequency-warped techniques for signal
parameterization and source separation, with application to voice
separation in music \[[37](#ref-wang94)\], \[[38](#ref-wang95)\]. He
introduced a frequency-locked loop algorithm which uses multiple
harmonically constrained trackers. He computed the estimated fundamental
frequency from a maximum-likelihood weighting of the tracking estimates.
He was then able to estimate harmonic signals such as voices from
complex mixtures.

Meron and Hirose proposed to separate singing voice and piano
accompaniment \[[39](#ref-meron98)\]. In their case, prior knowledge
consisting of musical scores was considered. Sinusoidal modeling as
described in \[[40](#ref-quatieri92)\] was used.

Ben-Shalom and Dubnov proposed to filter an instrument or a singing
voice out in such a way \[[41](#ref-ben-shalom04)\]. They first used a
score alignment algorithm \[[42](#ref-shalev-shwartz02)\], assuming a
known score. Then, they used the estimated pitch information to design a
filter based on a harmonic model \[[43](#ref-serra97)\] and performed
the filtering using the linear constraint minimum variance approach
\[[44](#ref-vanveen97)\]. They additionally used a heuristic to deal
with the unvoiced parts of the singing voice.

Zhang and Zhang proposed an approach based on harmonic structure
modeling \[[45](#ref-zhang05)\], \[[46](#ref-zhang06)\]. They first
extracted harmonic structures for singing voice and background music
signals using a sinusoidal model \[[43](#ref-serra97)\], by extending
the pitch estimation algorithm in \[[47](#ref-terhardt79)\]. Then, they
used the clustering algorithm in \[[48](#ref-zhang03)\] to learn
harmonic structure models for the background music signals. Finally,
they extracted the harmonic structures for all the instruments to
reconstruct the background music signals and subtract them from the
mixture, leaving only the singing voice signal.

More recently, Fujihara et al. proposed an accompaniment reduction
method for singer identification \[[49](#ref-fujihara05)\],
\[[50](#ref-fujihara10)\]. After fundamental frequency estimation
using \[[51](#ref-goto04)\], they extracted the harmonic structure of
the melody, i.e., the power and phase of the sinusoidal components at
fundamental frequency and harmonics. Finally, they resynthesized the
audio signal of the melody using the sinusoidal model in
\[[52](#ref-moorer05)\].

Similarly, Mesaros et al. proposed a vocal separation method to help
with singer identification \[[53](#ref-mesaros07)\]. They first applied
a melody transcription system \[[54](#ref-ryynanen06)\] which estimates
the melody line with the corresponding MIDI note numbers. Then, they
performed sinusoidal resynthesis, estimating amplitudes and phases from
the polyphonic signal.

In a similar manner, Duan et al. proposed to separate harmonic sources,
including singing voices, by using harmonic structure models
\[[55](#ref-duan08)\]. They first defined an average harmonic structure
model for an instrument. Then, they learned a model for each source by
detecting the spectral peaks using a cross-correlation method
\[[56](#ref-rodet97)\] and quadratic
interpolation \[[57](#ref-smith87)\]. Then, they extracted the harmonic
structures using BIC and a clustering algorithm \[[48](#ref-zhang03)\].
Finally, they separated the sources by re-estimating the fundamental
frequencies, re-extracting the harmonics, and reconstructing the signals
using a phase generation method \[[58](#ref-slaney94)\].

Lagrange et al. proposed to formulate lead separation as a graph
partition problem \[[59](#ref-lagrange07)\], \[[60](#ref-lagrange08)\].
They first identified peaks in the spectrogram and grouped the peaks
into clusters by using a similarity measure which accounts for
harmonically related peaks, and the normalized cut criterion
\[[61](#ref-shi00)\] which is used for segmenting graphs in computer
vision. They finally selected the cluster of peaks which corresponds to
a predominant harmonic source and resynthesized it using a bank of
sinusoidal oscillators.

Ryynänen et al. proposed to separate accompaniment from polyphonic music
using melody transcription for karaoke
applications \[[62](#ref-ryynanen08)\]. They first transcribed the
melody into a MIDI note sequence and a fundamental frequency trajectory,
using the method in \[[63](#ref-ryynanen082)\], an improved version of
the earlier method \[[54](#ref-ryynanen06)\]. Then, they used sinusoidal
modeling to estimate, resynthesize, and remove the lead vocals from the
musical mixture, using the quadratic polynomial-phase model in
\[[64](#ref-ding97)\].

### Comb-filtering approaches

Using sinusoidal synthesis to generate the lead signal suffers from a
typical *metallic* sound quality, which is mostly due to discrepancies
between the estimated excitation signals of the lead signal compared to
the ground truth. To address this issue, an alternative approach is to
exploit harmonicity in another way, by filtering out everything from the
mixture that is not located close to the detected harmonics.

Li and Wang proposed to use a vocal/non-vocal classifier and a
predominant pitch detection algorithm \[[65](#ref-li06)\],
\[[66](#ref-li07)\]. They first detected the singing voice by using a
spectral change detector \[[67](#ref-duxbury03)\] to partition the
mixture into homogeneous portions, and GMMs on MFCCs to classify the
portions as vocal or non-vocal. Then, they used the predominant pitch
detection algorithm in \[[68](#ref-li05)\] to detect the pitch contours
from the vocal portions, extending the multi-pitch tracking algorithm
in \[[69](#ref-wu03)\]. Finally, they extracted the singing voice by
decomposing the vocal portions into TF units and labeling them as
singing or accompaniment dominant, extending the speech separation
algorithm in \[[70](#ref-hu02)\].

Han and Raphael proposed an approach for desoloing a recording of a
soloist with an accompaniment given a musical score and its time
alignment with the recording \[[71](#ref-han07)\]. They derived a mask
\[[72](#ref-roweis01)\] to remove the solo part after using an EM
algorithm to estimate its melody, that exploits the score as side
information.

Hsu et al. proposed an approach which also identifies and separates the
unvoiced singing voice \[[73](#ref-hsu08)\], \[[74](#ref-hsu10)\].
Instead of processing in the STFT domain, they use the perceptually
motivated gammatone filter-bank as in \[[66](#ref-li07)\],
\[[70](#ref-hu02)\]. They first detected accompaniment, unvoiced, and
voiced segments using an HMM and identified voice-dominant TF units in
the voiced frames by using the singing voice separation method in
\[[66](#ref-li07)\], using the predominant pitch detection algorithm in
\[[75](#ref-dressler062)\]. Unvoiced-dominant TF units were identified
using a GMM classifier with MFCC features learned from training data.
Finally, filtering was achieved with spectral
subtraction \[[76](#ref-scalart96)\].

Raphael and Han then proposed a classifier-based approach to separate a
soloist from accompanying instruments using a time-aligned symbolic
musical score \[[77](#ref-raphael08)\]. They built a tree-structured
classifier \[[78](#ref-breiman84)\] learned from labeled training data
to classify TF points in the STFT as belonging to solo or accompaniment.
They additionally constrained their classifier to estimate masks having
a connected structure.

Cano et al. proposed various approaches for solo and accompaniment
separation. In \[[79](#ref-cano09)\], they separated saxophone melodies
from mixtures with piano and/or orchestra by using a melody line
detection algorithm, incorporating information about typical saxophone
melody lines. In \[[80](#ref-grollmisch11)\]–\[[82](#ref-cano12)\], they
proposed to use the pitch detection algorithm
in \[[83](#ref-dressler11)\]. Then, they refined the fundamental
frequency and the harmonics, and created a binary mask for the solo and
accompaniment. They finally used a post-processing stage to refine the
separation. In \[[84](#ref-cano13)\], they included a noise spectrum in
the harmonic refinement stage to also capture noise-like sounds in
vocals. In \[[85](#ref-cano14)\], they additionally included common
amplitude modulation characteristics in the separation scheme.

Bosch et al. proposed to separate the lead instrument using a musical
score \[[86](#ref-bosch12)\]. After a preliminary alignment of the score
to the mixture, they estimated a score confidence measure to deal with
local misalignments and used it to guide the predominant pitch tracking.
Finally, they performed low-latency separation based on the method in
\[[87](#ref-marxer12)\], by combining harmonic masks derived from the
estimated pitch and additionally exploiting stereo information as
presented later in Section [7](#sec:multichannel).

Vaneph et al. proposed a framework for vocal isolation to help spectral
editing \[[88](#ref-vaneph16)\]. They first used a voice activity
detection process based on a deep learning technique
\[[89](#ref-leglaive15)\]. Then, they used pitch tracking to detect the
melodic line of the vocal and used it to separate the vocal and
background, allowing a user to provide manual annotations when
necessary.

### Shortcomings

As can be seen, explicitly assuming that the lead signal is harmonic led
to an important body of research. While the aforementioned methods show
excellent performance when their assumptions are valid, their
performance can drop significantly in adverse, but common situations.

Firstly, vocals are not always purely harmonic as they contain unvoiced
phonemes that are not harmonic. As seen above, some methods already
handle this situation. However, vocals can also be whispered or
saturated, both of which are difficult to handle with a harmonic model.

Secondly, methods based on the harmonic model depend on the quality of
the pitch detection method. If the pitch detector switches from
following the pitch of the lead (e.g., the voice) to another instrument,
the wrong sound will be isolated from the mix. Often, pitch detectors
assume the lead signal is the *loudest* harmonic sound in the mix.
Unfortunately, this is not always the case. Another instrument may be
louder or the lead may be silent for a passage. The tendency to follow
the pitch of the wrong instrument can be mitigated by applying
constraints on the pitch range to estimate and by using a perceptually
relevant weighting filter before performing pitch tracking. Of course,
these approaches do not help when the lead signal is silent.

## Modeling the accompaniment: redundancy

In the previous section, we presented methods whose main focus was the
modeling of a harmonic lead melody. Most of these studies did not make
modeling the accompaniment a core focus. On the contrary, it was often
dealt with as adverse noise to which the harmonic processing method
should be robust to.

In this section, we present another line of research which concentrates
on modeling the accompaniment under the assumption it is somehow more
*redundant* than the lead signal. This assumption stems from the fact
that musical accompaniments are often highly structured, with elements
being repeated many times. Such repetitions can occur at the note level,
in terms of rhythmic structure, or even from a harmonic point of view:
instrumental notes are often constrained to have their pitch lie in a
small set of frequencies. Therefore, modeling and removing the redundant
elements of the signal are assumed to result in removal of the
accompaniment.

In this paper, we identify three families of methods that exploit the
redundancy of the accompaniment for separation.

### Grouping low-rank components


![](https://docs.google.com/drawings/d/e/2PACX-1vS1JrZuBXyzbaLEpt_ekUHVqENMcUWZkDjvhWvQSpN4vdUAr2asfRZzL471bpoUhbSNTN7b1nPojviG/pub?w=406&h=547)

#### The approaches based on a *low-rank* assumption. Non-negative matrix factorization (NMF) is used to identify *components* from the mixture, that are subsequently clustered into lead or accompaniment. Additional constraints may be incorporated.

The first set of approaches we consider is the identification of
redundancy in the accompaniment through the assumption that its
spectrogram may be well represented by only a few components. Techniques
exploiting this idea then focus on algebraic methods that decompose the
mixture spectrogram into the product of a few template spectra activated
over time. One way to do so is via non-negative matrix factorization
(NMF) \[[90](#ref-lee99)\], \[[91](#ref-lee01)\], which incorporates
non-negative constraints. In
Figure [\[fig:methods\_low\_rank\]](#fig:methods_low_rank), we picture
methods exploiting such techniques. After factorization, we obtain
several spectra, along with their activations over time. A subsequent
step is the clustering of these spectra (and activations) into the lead
or the accompaniment. Separation is finally performed by deriving Wiener
filters to estimate the lead and the accompaniment from the mixture. For
related applications of NMF in music analysis, the reader is referred to
\[[92](#ref-smaragdis03)\]–\[[94](#ref-fevotte09)\].

Vembu and Baumann proposed to use NMF (and also ICA
\[[95](#ref-common94)\]) to separate vocals from mixtures
\[[96](#ref-vembu05)\]. They first discriminated between vocal and
non-vocal sections in a mixture by using different combinations of
features, such as MFCCs \[[25](#ref-david80)\], perceptual linear
predictive (PLP) coefficients \[[97](#ref-hermansky90)\], and log
frequency power coefficients (LFPC) \[[98](#ref-nwe04)\], and training
two classifiers, namely neural networks and support vector machines
(SVM). They then applied redundancy reduction techniques on the TF
representation of the mixture to separate the sources
\[[99](#ref-casey00)\], by using NMF (or ICA). The components were then
grouped as vocal and non-vocal by reusing a vocal/non-vocal classifier
with MFCC, LFPC, and PLP coefficients.

Chanrungutai and Ratanamahatana proposed to use NMF with automatic
component selection\[[100](#ref-chanrungutai08)\],
\[[101](#ref-chanrungutai082)\]. They first decomposed the mixture
spectrogram using NMF with a fixed number of basis components. They then
removed the components with brief rhythmic and long-lasting continuous
events, assuming that they correspond to instrumental sounds. They
finally used the remaining components to reconstruct the singing voice,
after refining them using a high-pass filter.

Marxer and Janer proposed an approach based on a Tikhonov
regularization \[[102](#ref-tikhonov63)\] as an alternative to NMF, for
singing voice separation \[[103](#ref-marxer122)\]. Their method
sacrificed the non-negativity constraints of the NMF in exchange for a
computationally less expensive solution for spectrum decomposition,
making it more interesting in low-latency scenarios.

Yang et al. proposed a Bayesian NMF approach \[[104](#ref-yang14)\],
\[[105](#ref-chien15)\]. Following the approaches in
\[[106](#ref-cemgil09)\] and \[[107](#ref-schmidt09)\], they used a
Poisson distribution for the likelihood function and exponential
distributions for the model parameters in the NMF algorithm, and derived
a variational Bayesian EM algorithm \[[32](#ref-dempster77)\] to solve
the NMF problem. They also adaptively determined the number of bases
from the mixture. They finally grouped the bases into singing voice and
background music by using a *k*-means clustering algorithm
\[[108](#ref-spiertz09)\] or an NMF-based clustering algorithm.

In a different manner, Smaragdis and Mysore proposed a user-guided
approach for removing sounds from mixtures by humming the target sound
to be removed, for example a vocal track \[[109](#ref-smaragdis09)\].
They modeled the mixture using probabilistic latent component analysis
(PLCA) \[[110](#ref-smaragdis07)\], another equivalent formulation of
NMF. One key feature of exploiting user input was to facilitate the
grouping of components into vocals and accompaniment, as humming helped
to identify some of the parameters for modeling the vocals.

Nakamuray and Kameoka proposed an \(L_p\)-norm
NMF \[[111](#ref-nakamuray15)\], with \(p\) controlling the sparsity of
the error. They developed an algorithm for solving this NMF problem
based on the auxiliary function principle \[[112](#ref-ortega70)\],
\[[113](#ref-kameoka06)\]. Setting an adequate number of bases and \(p\)
taken as small enough allowed them to estimate the accompaniment as the
low-rank decomposition, and the singing voice as the error of the
approximation, respectively. Note that, in this case, the singing voice
was not explicitly modeled as a sparse component but rather corresponded
to the error which happened to be constrained as sparse. The next
subsection will actually deal with approaches that explicitly model the
vocals as the sparse component.

### Low-rank accompaniment, sparse vocals

![](https://docs.google.com/drawings/d/e/2PACX-1vSDMQhw6sU4gz4pG1sne-HLDS1qaEnfZ0fVL23yawA9EoHTQa_ZTBiJYwZVqnDVYfikANm9ZIiIU8Xh/pub?w=720)

#### The approaches based on a *low-rank accompaniment, sparse vocals* assumption. As opposed to methods based on NMF, methods based on robust principal component analysis (RPCA) assume the lead signal has a sparse and non-structured spectrogram.

The methods presented in the previous section first compute a
decomposition of the mixture into many components that are sorted *a
posteriori* as accompaniment or lead. As can be seen, this means they
make a low-rank assumption for the accompaniment, but typically *also
for the vocals*. However, as can for instance be seen on
Figure [\[fig:stylized\_vocals\_accompaniment\]](#fig:stylized_vocals_accompaniment),
the spectrogram for the vocals do exhibit much more freedom than
accompaniment, and experience shows they are not adequately described by
a small number of spectral bases. For this reason, another track of
research depicted in Figure [\[fig:methods\_rpca\]](#fig:methods_rpca)
focused on using a low-rank assumption on the accompaniment *only*,
while assuming the vocals are *sparse and not structured*. This loose
assumption means that only a few coefficients from their spectrogram
should have significant magnitude, and that they should not feature
significant redundancy. Those ideas are in line with robust principal
component analysis (RPCA) \[[114](#ref-candes11)\], which is the
mathematical tool used by this body of methods, initiated by Huang et
al. for singing voice separation \[[115](#ref-huang12)\] . It decomposes
a matrix into a sparse and low-rank component.

Sprechmann et al. proposed an approach based on RPCA for online singing
voice separation \[[116](#ref-sprechmann12)\]. They used ideas from
convex optimization \[[117](#ref-recht10)\], \[[118](#ref-recht13)\] and
multi-layer neural networks \[[119](#ref-gregor10)\]. They presented two
extensions of RPCA and robust NMF models \[[120](#ref-zhang11)\]. They
then used these extensions in a multi-layer neural network framework
which, after an initial training stage, allows online source separation.

Jeong and Lee proposed two extensions of the RPCA model to improve the
estimation of vocals and accompaniment from the sparse and low-rank
components \[[121](#ref-jeong14)\]. Their first extension included the
Schatten \(p\) and \(\ell_{p}\) norms as generalized nuclear norm
optimizations \[[122](#ref-nie152)\]. They also suggested a
pre-processing stage based on logarithmic scaling of the mixture TF
representation to enhance the RPCA.

Yang also proposed an approach based on RPCA with dictionary learning
for recovering low-rank components \[[123](#ref-yang13)\]. He introduced
a multiple low-rank representation following the observation that
elements of the singing voice can also be recovered by the low-rank
component. He first incorporated online dictionary learning methods
\[[124](#ref-mairal09)\] in his methodology to obtain prior information
about the structure of the sources and then incorporated them into the
RPCA model.

Chan and Yang then extended RPCA to complex and quaternionic cases with
application to singing voice separation \[[125](#ref-chan16)\]. They
extended the principal component pursuit (PCP) \[[114](#ref-candes11)\]
for solving the RPCA problem by presenting complex and quaternionic
proximity operators for the \(\ell_{1}\) and trace-norm regularizations
to account for the missing phase information.

### Repetitions within the accompaniment

While the rationale behind low-rank methods for lead-accompaniment
separation is to exploit the idea that the musical background should be
redundant, adopting a low-rank model is not the only way to do it. An
alternate way to proceed is to exploit the musical *structure* of songs,
to find *repetitions* that can be utilized to perform separation. Just
like in RPCA-based methods, the accompaniment is then assumed to be the
only source for which repetitions will be found. The unique feature of
the methods described here is they combine music structure analysis
\[[126](#ref-peeters03)\]–\[[128](#ref-paulus10)\] with particular ways
to exploit the identification of repeated parts of the accompaniment.

![](https://docs.google.com/drawings/d/e/2PACX-1vTsnQlO0NWOqGKwG1ksYtD8oYpf2exFzCkHV6pX5COfgGCmJVNhl3E64qcgoq3dJwdapgK9eXltAUIH/pub?w=720)

#### The approaches based on a *repetition* assumption for accompaniment. In a first analysis step, repetitions are identified. Then, they are used to build an estimate for the accompaniment spectrogram and proceed to separation.

Rafii et al. proposed the REpeating Pattern Extraction Technique (REPET)
to separate the accompaniment by assuming it is repeating
\[[129](#ref-rafii11)\]–\[[131](#ref-rafii14)\], which is often the case
in popular music. This approach, which is representative of this line of
research, is represented on
Figure [\[fig:methods\_repet\]](#fig:methods_repet). First, a repeating
period is extracted by a music information retrieval system, such as a
beat spectrum \[[132](#ref-foote01)\] in this case. Then, this extracted
information is used to estimate the spectrogram of the accompaniment
through an averaging of the identified repetitions. From this, a filter
is derived.

Seetharaman et al.\[[133](#ref-seetharaman17)\] leveraged the two
dimensional Fourier transform (2DFT) of the spectrogram to create an
algorithm very similar to REPET. The properties of the 2DFT let them
separate the periodic background from the non-periodic vocal melody by
deleting peaks in the 2DFT. This eliminated the need to create an
explicit model of the periodic audio and without the need to find the
period of repetition, both of which are required in REPET.

Liutkus et al. adapted the REPET approach in \[[129](#ref-rafii11)\],
\[[130](#ref-rafii13)\] to handle repeating structures varying along
time by modeling the repeating patterns only locally
\[[131](#ref-rafii14)\], \[[134](#ref-liutkus12)\]. They first
identified a repeating period for every time frame by computing a beat
spectrogram as in \[[132](#ref-foote01)\]. Then they estimated the
spectrogram of the accompaniment by averaging the time frames in the
mixture spectrogram at their local period rate, for every TF bin. From
this, they finally extracted the repeating structure by deriving a TF
mask.

Rafii et al. further extended the REPET approaches in
\[[129](#ref-rafii11)\], \[[130](#ref-rafii13)\] and
\[[134](#ref-liutkus12)\] to handle repeating structures that are not
periodic. To do this, they proposed the REPET-SIM method in
\[[131](#ref-rafii14)\], \[[135](#ref-rafii12)\] to identify repeating
frames for every time frame by computing a self-similarity matrix, as in
\[[136](#ref-foote99)\]. Then, they estimated the accompaniment
spectrogram at every TF bin by averaging the neighbors identified thanks
to that similarity matrix. An extension for real-time processing was
presented in \[[137](#ref-rafii133)\] and a version exploiting user
interaction was proposed in \[[138](#ref-rafii15)\]. A method close to
REPET-SIM was also proposed by FitzGerald in
\[[139](#ref-fitzgerald12)\].

Liutkus et al. proposed the Kernel Additive modeling (KAM)
\[[140](#ref-liutkus14)\], \[[141](#ref-liutkus142)\] as a framework
which generalizes the REPET approaches in
\[[129](#ref-rafii11)\]–\[[131](#ref-rafii14)\],
\[[134](#ref-liutkus12)\], \[[135](#ref-rafii12)\]. They assumed that a
source at a TF location can be modeled using its values at other
locations through a specified kernel which can account for features such
as periodicity, self-similarity, stability over time or frequency, etc.
This notably enabled modeling of the accompaniment using more than one
repeating pattern. Liutkus et al. also proposed a light version using a
fast compression algorithm to make the approach more scalable
\[[142](#ref-liutkus15)\]. The approach was also used for interference
reduction in music recordings \[[143](#ref-pratzlich15)\],
\[[144](#ref-fanoyela17)\].

With the same idea of exploiting intra-song redundancies for singing
voice separation, but through a very different methodology, Moussallam
et al. assumed in \[[145](#ref-moussallam12)\] that all the sources can
be decomposed sparsely in the same dictionary and used a matching
pursuit greedy algorithm \[[146](#ref-mallat93)\] to solve the problem.
They integrated the separation process in the algorithm by modifying the
atom selection criterion and adding a decision to assign a chosen atom
to the repeated source or to the lead signal.

Deif et al. proposed to use multiple median filters to separate vocals
from music recordings \[[147](#ref-deif152)\]. They augmented the
approach in \[[148](#ref-fitzgerald102)\] with diagonal median filters
to improve the separation of the vocal component. They also investigated
different filter lengths to further improve the separation.

Lee et al. also proposed to use the KAM approach
\[[149](#ref-lee152)\]–\[[152](#ref-kim16)\]. They applied the
\(\beta\)-order minimum mean square error (MMSE) estimation
\[[153](#ref-plourde08)\] to the back-fitting algorithm in KAM to
improve the separation. They adaptively calculated a perceptually
weighting factor \(\alpha\) and the singular value decomposition
(SVD)-based factorized spectral amplitude exponent \(\beta\) for each
kernel component.

### Shortcomings

While methods focusing on harmonic models for the lead often fall short
in their expressive power for the accompaniment, the methods we reviewed
in this section are often observed to suffer exactly from the converse
weakness, namely they do not provide an adequate model for the lead
signal. Hence, the separated vocals often will feature interference from
unpredictable parts from the accompaniment, such as some percussion or
effects which occur infrequently.

Furthermore, even if the musical accompaniment will exhibit more
redundancy, the vocals part will also be redundant to some extent, which
is poorly handled by these methods. When the lead signal is not vocals
but played by some lead instrument, its redundancy is even more
pronounced, because the notes it plays lie in a reduced set of
fundamental frequencies. Consequently, such methods would include the
redundant parts of the lead within the accompaniment estimate, for
example, a steady humming by a vocalist.

## Joint models for lead and accompaniment

In the previous sections, we reviewed two important bodies of
literature, focused on modeling either the lead or the accompaniment
parts of music recordings, respectively. While each approach showed its
own advantages, it also featured its own drawbacks. For this reason,
some researchers devised methods combining ideas for modeling both the
lead and the accompaniment sources, and thus benefiting from both
approaches. We now review this line of research.

### Using music structure analysis to drive learning

The first idea we find in the literature is to augment methods for
accompaniment modeling with the prior identification of sections where
the vocals are present or absent. In the case of the low rank models
discussed in Sections [4.1](#ssec:NMF) and [4.2](#ssec:RPCA), such a
strategy indeed dramatically improves performance.

Raj et al. proposed an approach in \[[154](#ref-raj07)\] that is based
on the PLCA formulation of NMF \[[155](#ref-smaragdis06)\], and extends
their prior work \[[156](#ref-raj05)\]. The parameters for the frequency
distribution of the background music are estimated from the background
music-only segments, and the rest of the parameters from the singing
voice+background music segments, assuming a priori identified vocal
regions.

Han and Chen also proposed a similar approach for melody extraction
based on PLCA \[[157](#ref-han11)\], which includes a further estimate
of the melody from the vocals signal by an autocorrelation technique
similar to \[[158](#ref-boersma93)\].

Gómez et al. proposed to separate the singing voice from the guitar
accompaniment in flamenco music to help with melody transcription
\[[159](#ref-gomez12)\]. They first manually segmented the mixture into
vocal and non-vocal regions. They then learned percussive and harmonic
bases from the non-vocal regions by using an unsupervised NMF
percussive/harmonic separation approach \[[93](#ref-virtanen07)\],
\[[160](#ref-ono08)\]. The vocal spectrogram was estimated by keeping
the learned percussive and harmonic bases fixed.

Papadopoulos and Ellis proposed a signal-adaptive formulation of RPCA
which incorporates music content information to guide the recovery of
the sparse and low-rank components \[[161](#ref-papadopoulos14)\]. Prior
musical knowledge, such as predominant melody, is used to regularize the
selection of active coefficients during the optimization procedure.

In a similar manner, Chan et al. proposed to use RPCA with vocal
activity information \[[162](#ref-chan15)\]. They modified the RPCA
algorithm to constraint parts of the input spectrogram to be non-sparse
to account for the non-vocal parts of the singing voice.

A related method was proposed by Jeong and Lee in
\[[163](#ref-jeong17)\], using RPCA with a weighted \(l_1\)-norm. They
replaced the uniform weighting between the low-rank and sparse
components in the RPCA algorithm by an adaptive weighting based on the
variance ratio between the singing voice and the accompaniment. One key
element of the method is to incorporate vocal activation information in
the weighting.

### Factorization with a known melody

While using only the knowledge of vocal activity as described above
already yields an increase of performance over methods operating
blindly, many authors went further to also incorporate the fact that
vocals often have a strong melody line. Some redundant model is then
assumed for the accompaniment, while also enforcing a harmonic model for
the vocals.

![](https://docs.google.com/drawings/d/e/2PACX-1vSnyEXv0_Zwpc25L8mcLTDhNK84jaTrOWu2L8kM4W75Whmw6xSz3KR-XTZ3wErGk9CeFgf35HHy0z5G/pub?w=720)

#### Factorization informed with the melody. First, melody extraction is performed on the mixture. Then, this information is used to drive the estimation of the accompaniment: TF bins pertaining to the lead should not be taken into account for estimating the accompaniment model.

An early method to achieve this is depicted in
Figure [\[fig:NMF\_known\_melody\]](#fig:NMF_known_melody) and was
proposed by Virtanen et al. in \[[164](#ref-virtanen08)\]. They
estimated the pitch of the vocals in the mixture by using a melody
transcription algorithm \[[63](#ref-ryynanen082)\] and derived a binary
TF mask to identify where vocals are not present. They then applied NMF
on the remaining non-vocal segments to learn a model for the background.

Wang and Ou also proposed an approach which combines melody extraction
and NMF-based soft masking \[[165](#ref-wang11)\]. They identified
accompaniment, unvoiced, and voiced segments in the mixture using an HMM
model with MFCCs and GMMs. They then estimated the pitch of the vocals
from the voiced segments using the method in \[[166](#ref-klapuri06)\]
and an HMM with the Viterbi algorithm as in \[[167](#ref-hsu09)\]. They
finally applied a soft mask to separate voice and accompaniment.

Rafii et al. investigated the combination of an approach for modeling
the background and an approach for modeling the melody
\[[168](#ref-rafii142)\]. They modeled the background by deriving a
rhythmic mask using the REPET-SIM algorithm \[[135](#ref-rafii12)\] and
the melody by deriving a harmonic mask using a pitch-based algorithm
\[[169](#ref-duan10)\]. They proposed a parallel and a sequential
combination of those algorithms.

Venkataramani et al. proposed an approach combining sinusoidal modeling
and matrix decomposition, which incorporates prior knowledge about
singer and phoneme identity \[[170](#ref-venkataramani14)\]. They
applied a predominant pitch algorithm on annotated sung regions
\[[171](#ref-rao10)\] and performed harmonic sinusoidal modeling
\[[172](#ref-rao11)\]. Then, they estimated the spectral envelope of the
vocal component from the spectral envelope of the mixture using a
phoneme dictionary. After that, a spectral envelope dictionary
representing sung vowels from song segments of a given singer was
learned using an extension of NMF \[[173](#ref-kim112)\],
\[[174](#ref-zhou14)\]. They finally estimated a soft mask using the
singer-vowel dictionary to refine and extract the vocal component.

Ikemiya et al. proposed to combine RPCA with pitch
estimation\[[175](#ref-ikemiya15)\], \[[176](#ref-ikemiya16)\]. They
derived a mask using RPCA \[[115](#ref-huang12)\] to separate the
mixture spectrogram into singing voice and accompaniment components.
They then estimated the fundamental frequency contour from the singing
voice component based on \[[177](#ref-hermes88)\] and derived a harmonic
mask. They integrated the two masks and resynthesized the singing voice
and accompaniment signals. Dobashi et al. then proposed to use that
singing voice separation approach in a music performance assistance
system \[[178](#ref-dobashi15)\].

Hu and Liu proposed to combine approaches based on matrix decomposition
and pitch information for singer identification\[[179](#ref-hu15)\].
They used non-negative matrix partial co-factorization
\[[173](#ref-kim112)\], \[[180](#ref-yoo10)\] which integrates prior
knowledge about the singing voice and the accompaniment, to separate the
mixture into singing voice and accompaniment portions. They then
identified the singing pitch from the singing voice portions using
\[[181](#ref-boersma01)\] and derived a harmonic mask as in
\[[182](#ref-li09)\], and finally reconstructed the singing voice using
a missing feature method \[[183](#ref-raj04)\]. They also proposed to
add temporal and sparsity criteria to their algorithm
\[[184](#ref-hu16)\].

That methodology was also adopted by Zhang et al. in
\[[185](#ref-zhang15)\], that followed the framework of the pitch-based
approach in \[[66](#ref-li07)\], by performing singing voice detection
using an HMM classifier, singing pitch detection using the algorithm in
\[[186](#ref-decheveigne02)\], and singing voice separation using a
binary mask. Additionally, they augmented that approach by analyzing the
latent components of the TF matrix using NMF in order to refine the
singing voice and accompaniment.

Zhu et al. \[[187](#ref-zhu15)\] proposed an approach which is also
representative of this body of literature, with the pitch detection
algorithm being the one in \[[181](#ref-boersma01)\] and binary TF masks
used for separation after NMF.

### Joint factorization and melody estimation

The methods presented above put together the ideas of modeling the lead
(typically the vocals) as featuring a melodic harmonic line and the
accompaniment as redundant. As such, they already exhibit significant
improvement over approaches only applying one of these ideas as
presented in Sections [3](#sec:lead-harmonicity)
and [4](#sec:accompaniment-redundancy), respectively. However, these
methods above are still restricted in the sense that the analysis
performed on each side cannot help improve the other one. In other
words, the estimation of the models for the lead and the accompaniment
are done sequentially. Another idea is to proceed *jointly*.

![](https://docs.google.com/drawings/d/e/2PACX-1vQ-ORJenf_FMWUl1CkGsNR5Vq9Gf8YapW_tkQwuAWTYGVVG6wzCablPGA_M_464l-Gig6Y6mr6nbFNX/pub?w=720)

#### Joint estimation of the lead and accompaniment, the former one as a source-filter model and the latter one as an NMF model.

A seminal work in this respect was done by Durrieu et al. using a
source-filter and NMF model
\[[188](#ref-durrieu08)\]–\[[190](#ref-durrieu10)\], depicted in
Figure [\[fig:methods\_sourcefilter\]](#fig:methods_sourcefilter). Its
core idea is to decompose the mixture spectrogram as the sum of two
terms. The first term accounts for the lead and is inspired by the
source-filter model described in Section [2](#sec:concepts): it is the
element-wise product of an *excitation* spectrogram with a *filter*
spectrogram. The former one can be understood as harmonic combs
activated by the melodic line, while the latter one modulates the
envelope and is assumed low-rank because few phonemes are used. The
second term accounts for the accompaniment and is modeled with a
standard NMF. In \[[188](#ref-durrieu08)\]–\[[190](#ref-durrieu10)\],
they modeled the lead by using a GMM-based model
\[[191](#ref-ozerov07)\] and a glottal source model
\[[192](#ref-klatt90)\], and the accompaniment by using an instantaneous
mixture model \[[193](#ref-benaroya032)\] leading to an NMF problem
\[[94](#ref-fevotte09)\]. They jointly estimated the parameters of their
models by maximum likelihood estimation using an iterative algorithm
inspired by \[[194](#ref-dhillon05)\] with multiplicative update rules
developed in \[[91](#ref-lee01)\]. They also extracted the melody by
using an algorithm comparable to the Viterbi algorithm, before
re-estimating the parameters and finally performing source separation
using Wiener filters \[[195](#ref-benaroya06)\]. In
\[[196](#ref-durrieu12)\], they proposed to adapt their model for
user-guided source separation.

The joint modeling of the lead and accompaniment parts of a music signal
was also considered by Fuentes et al. in \[[197](#ref-fuentes2012)\],
that introduced the idea of using a log-frequency TF representation
called the constant-Q transform (CQT)
\[[198](#ref-brown91)\]–\[[200](#ref-schorkhuber10)\]. The advantage
of such a representation is that a change in pitch corresponds to a
simple translation in the TF plane, instead of a scaling as in the STFT.
This idea was used along the creation of a user interface to guide the
decomposition, in line with what was done in \[[196](#ref-durrieu12)\].

Joder and Schuller used the source-filter NMF model in
\[[201](#ref-durrieu11)\], additionally exploiting MIDI scores
\[[202](#ref-joder12)\]. They synchronized the MIDI scores to the audio
using the alignment algorithm in \[[203](#ref-joder11)\]. They proposed
to exploit the score information through two types of constraints
applied in the model. In a first approach, they only made use of the
information regarding whether the leading voice is present or not in
each frame. In a second approach, they took advantage of both time and
pitch information on the aligned score.

Zhao et al. proposed a score-informed leading voice separation system
with a weighting scheme \[[204](#ref-zhao14)\]. They extended the system
in \[[202](#ref-joder12)\], which is based on the source-filter NMF
model in \[[201](#ref-durrieu11)\], by using a Laplacian or a
Gaussian-based mask on the NMF activation matrix to enhance the
likelihood of the score-informed pitch candidates.

Jointly estimating accompaniment and lead allowed for some research in
correctly estimating the unvoiced parts of the lead, which is the main
issue with purely harmonic models, as highlighted in
Section [3.3](#ssec:shortcomings_harmonics). In
\[[201](#ref-durrieu11)\], \[[205](#ref-durrieu092)\], Durrieu et al.
extended their model to account for the unvoiced parts by adding white
noise components to the voice model.

In the same direction, Janer and Marxer proposed to separate unvoiced
fricative consonants using a semi-supervised NMF
\[[206](#ref-janer13)\]. They extended the source-filter NMF model in
\[[201](#ref-durrieu11)\] using a low-latency method with timbre
classification to estimate the predominant pitch
\[[87](#ref-marxer12)\]. They approximated the fricative consonants as
an additive wideband component, training a model of NMF bases. They also
used the transient quality to differentiate between fricatives and
drums, after extracting transient time points using the method in
\[[207](#ref-janer12)\].

Similarly, Marxer and Janer then proposed to separately model the
singing voice breathiness \[[208](#ref-marxer13)\]. They estimated the
breathiness component by approximating the voice spectrum as a filtered
composition of a glottal excitation and a wideband component. They
modeled the magnitude of the voice spectrum using the model in
\[[209](#ref-degottex11)\] and the envelope of the voice excitation
using the model in \[[192](#ref-klatt90)\]. They estimated the pitch
using the method in \[[87](#ref-marxer12)\]. This was all integrated
into the source-filter NMF model.

The body of research initiated by Durrieu et al. in
\[[188](#ref-durrieu08)\] consists of using algebraic models more
sophisticated than one simple matrix product, but rather inspired by
musicological knowledge. Ozerov et al. formalized this idea through a
general framework and showed its application for singing voice
separation \[[210](#ref-ozerov102)\]–\[[212](#ref-salaun14)\].

Finally, Hennequin and Rigaud augmented their model to account for
long-term reverberation, with application to singing voice separation
\[[213](#ref-hennequin16)\]. They extended the model in
\[[214](#ref-singh10)\] which allows extraction of the reverberation of
a specific source with its dry signal. They combined this model with the
source-filter NMF model in \[[189](#ref-durrieu09)\].

### Different constraints for different sources

Algebraic methods that decompose the mixture spectrogram as the sum of
the lead and accompaniment spectrograms are based on the minimization of
a *cost* or *loss function* which measures the error between the
approximation and the observation. While the methods presented above for
lead and accompaniment separation did propose more sophisticated models
with parameters explicitly pertaining to the lead or the accompaniment,
another option that is also popular in the dedicated literature is to
modify the cost function of an optimization algorithm for an existing
algorithm (e.g., RPCA), so that one part of the resulting components
would preferentially account for one source or another.

This approach can be exemplified by the harmonic-percussive source
separation method (HPSS), presented in \[[160](#ref-ono08)\],
\[[215](#ref-ono082)\], \[[216](#ref-fitzgerald10)\]. It consists in
filtering a mixture spectrogram so that horizontal lines go in a
so-called *harmonic* source, while its vertical lines go into a
*percussive* source. Separation is then done with TF masking. Of course,
such a method is not adequate for lead and accompaniment separation *per
se*, because all the harmonic content of the accompaniment is classified
as harmonic. However, it shows that *nonparametric* approaches are also
an option, provided the cost function itself is well chosen for each
source.

This idea was followed by Yang in \[[217](#ref-yang12)\] who proposed an
approach based on RPCA with the incorporation of harmonicity priors and
a back-end drum removal procedure to improve the decomposition. He added
a regularization term in the algorithm to account for harmonic sounds in
the low-rank component and used an NMF-based model trained for drum
separation \[[211](#ref-ozerov12)\] to eliminate percussive sounds in
the sparse component.

Jeong and Lee proposed to separate a vocal signal from a music signal
\[[218](#ref-jeong142)\], extending the HPSS approach in
\[[160](#ref-ono08)\], \[[215](#ref-ono082)\]. Assuming that the
spectrogram of the signal can be represented as the sum of harmonic,
percussive, and vocal components, they derived an objective function
which enforces the temporal and spectral continuity of the harmonic and
percussive components, respectively, similarly to \[[160](#ref-ono08)\],
but also the sparsity of the vocal component. Assuming non-negativity of
the components, they then derived iterative update rules to minimize the
objective function. Ochiai et al. extended this work in
\[[219](#ref-ochiai15)\], notably by imposing harmonic constraints for
the lead.

Watanabe et al. extended RPCA for singing voice separation
\[[220](#ref-watanabe16)\]. They added a harmonicity constraint in the
objective function to account for harmonic structures, such as in vocal
signals, and regularization terms to enforce the non-negativity of the
solution. They used the generalized forward-backward splitting algorithm
\[[221](#ref-raguet13)\] to solve the optimization problem. They also
applied post-processing to remove the low frequencies in the vocal
spectrogram and built a TF mask to remove time frames with low energy.

Going beyond smoothness and harmonicity, Hayashi et al. proposed an NMF
with a constraint to help separate periodic components, such as a
repeating accompaniment \[[222](#ref-hayashi16)\]. They defined a
periodicity constraint which they incorporated in the objective function
of the NMF algorithm to enforce the periodicity of the bases.

### Cascaded and iterated methods

In their effort to propose separation methods for the lead and
accompaniment in music, some authors discovered that very different
methods often have complementary strengths. This motivated the
*combination* of methods. In practice, there are several ways to follow
this line of research.

One potential route to achieve better separation is to *cascade* several
methods. This is what FitzGerald and Gainza proposed in
\[[216](#ref-fitzgerald10)\] with multiple median filters
\[[148](#ref-fitzgerald102)\]. They used a median-filter based HPSS
approach at different frequency resolutions to separate a mixture into
harmonic, percussive, and vocal components. They also investigated the
use of STFT or CQT as the TF representation and proposed a
post-processing step to improve the separation with tensor factorization
techniques \[[223](#ref-fitzgerald09)\] and non-negative partial
co-factorization \[[180](#ref-yoo10)\].

The two-stage HPSS system proposed by Tachibana et al. in
\[[224](#ref-tachibana14)\] proceeds the same way. It is an extension of
the melody extraction approach in \[[225](#ref-tachibana10)\] and was
applied for karaoke in \[[226](#ref-tachibana16)\]. It consists in using
the optimization-based HPSS algorithm from \[[160](#ref-ono08)\],
\[[215](#ref-ono082)\], \[[227](#ref-ono10)\],
\[[228](#ref-tachibana12)\] at different frequency resolutions to
separate the mixture into harmonic, percussive, and vocal components.

![](https://docs.google.com/drawings/d/e/2PACX-1vSd3BGs_oCGRJlqPsH6O1ZDcbPPtc9ttABvNXvN8M5E2BggOcmToEVnVTmQPvAU4RMhCbm7MDerswoU/pub?w=392&h=499)

#### Cascading source separation methods. The results from method A is improved by applying methods B and C on its output, which are specialized in reducing interferences from undesired sources in each signal.

HPSS was not the only separation module considered as the building block
of combined lead and accompaniment separation approaches. Deif et al.
also proposed a multi-stage NMF-based algorithm \[[229](#ref-deif15)\],
based on the approach in \[[230](#ref-zhu13)\]. They used a local
spectral discontinuity measure to refine the non-pitched components
obtained from the factorization of the long window spectrogram and a
local temporal discontinuity measure to refine the non-percussive
components obtained from factorization of the short window spectrogram.

Finally, this cascading concept was considered again by Driedger and
Müller in \[[231](#ref-driedger15)\], that introduces a processing
pipeline for the outputs of different methods \[[115](#ref-huang12)\],
\[[164](#ref-virtanen08)\], \[[232](#ref-driedger14)\],
\[[233](#ref-talmon11)\] to obtain an improved separation quality. Their
core idea is depicted in
Figure [\[fig:methods\_cascading\]](#fig:methods_cascading) and
combines the output of different methods in a specific order to improve
separation.

Another approach for improving the quality of separation when using
several separation procedures is not to restrict the number of such
iterations from one method to another, but rather to iterate them many
times until satisfactory results are obtained. This is what is proposed
in Hsu et al. in \[[234](#ref-hsu12)\], extending the algorithm in
\[[235](#ref-hu10)\]. They first estimated the pitch range of the
singing voice by using the HPSS method in \[[160](#ref-ono08)\],
\[[225](#ref-tachibana10)\]. They separated the voice given the
estimated pitch using a binary mask obtained by training a multilayer
perceptron \[[236](#ref-rumelhart86)\] and re-estimated the pitch given
the separated voice. Voice separation and pitch estimation are then
iterated until convergence.

As another iterative method, Zhu et al. proposed a multi-stage NMF
\[[230](#ref-zhu13)\], using harmonic and percussive separation at
different frequency resolutions similar to \[[225](#ref-tachibana10)\]
and \[[216](#ref-fitzgerald10)\]. The main originality of their
contribution was to iterate the refinements instead of applying it only
once.

An issue with such iterated methods lies in how to decide whether
convergence is obtained, and it is not clear whether the quality of the
separated signals will necessarily improve. For this reason, Bryan and
Mysore proposed a user-guided approach based on PLCA, which can be
applied for the separation of the vocals
\[[237](#ref-bryan13)\]–\[[239](#ref-bryan133)\]. They allowed a user
to make annotations on the spectrogram of a mixture, incorporated the
feedback as constraints in a PLCA model \[[110](#ref-smaragdis07)\],
\[[156](#ref-raj05)\], and used a posterior regularization technique
\[[240](#ref-ganchev10)\] to refine the estimates, repeating the process
until the user is satisfied with the results. This is similar to the way
Ozerov et al. proposed to take user input into account in
\[[241](#ref-ozerov13)\].


![](https://docs.google.com/drawings/d/e/2PACX-1vT4NTF1Q8ctDDQGm_bui5NLHZczmdH8XGB9K8Wq9R9E93k9Ev-INRXKmDIVifcz8X4JZoGdcuij6U-F/pub?w=540)

#### Fusion of separation methods. The output of many separation methods is fed into a fusion system that combines them to produce a single estimate.


A principled way to aggregate the result of many source separation
systems to obtain one single estimate that is consistently better than
all of them was presented by Jaureguiberry et al. in their *fusion
framework*, depicted in
Figure [\[fig:methods\_fusion\]](#fig:methods_fusion). It takes
advantage of multiple existing approaches, and demonstrated its
application to singing voice separation
\[[242](#ref-jaureguiberry13)\]–\[[244](#ref-jaureguiberry16)\]. They
investigated fusion methods based on non-linear optimization, Bayesian
model averaging \[[245](#ref-hoeting99)\], and deep neural networks
(DNN).

As another attempt to design an efficient fusion method, McVicar et al.
proposed in \[[246](#ref-mcvicar16)\] to combine the outputs of RPCA
\[[115](#ref-huang12)\], HPSS \[[216](#ref-fitzgerald10)\], Gabor
filtered spectrograms \[[247](#ref-jain90)\], REPET
\[[130](#ref-rafii13)\] and an approach based on deep learning
\[[248](#ref-huang14)\]. To do this, they used different classification
techniques to build the aggregated TF mask, such as a logistic
regression model or a conditional random field (CRF) trained using the
method in \[[249](#ref-lacoste-julien13)\] with time and/or frequency
dependencies.

Manilow et al. trained a neural network to predict quality of source
separation for three source separation algorithms, each leveraging a
different cue - repetition, spatialization, and harmonicity/pitch
proximity \[[250](#ref-manilow17)\]. The method estimates separation
quality of the lead vocals for each algorithm, using only the original
audio mixture and separated source output. These estimates were used to
guide switching between algorithms along time.

### Source-dependent representations

In the previous section, we stated that some authors considered
iterating separation at different frequency resolutions, i.e., using
different TF representations \[[216](#ref-fitzgerald10)\],
\[[224](#ref-tachibana14)\], \[[229](#ref-deif15)\]. This can be seen as
a combination of different methods. However, this can also be seen from
another perspective as based on picking specific *representations*.

Wolf et al. proposed an approach using rigid motion segmentation, with
application to singing voice separation \[[251](#ref-wolf14)\],
\[[252](#ref-wolf16)\]. They introduced harmonic template models with
amplitude and pitch modulations defined by a velocity vector. They
applied a wavelet transform \[[253](#ref-anden14)\] on the harmonic
template models to build an audio image where the amplitude and pitch
dynamics can be separated through the velocity vector. They then derived
a velocity equation, similar to the optical flow velocity equation used
in images \[[254](#ref-bernard01)\], to segment velocity components.
Finally, they identified the harmonic templates which model different
sources in the mixture and separated them by approximating the velocity
field over the corresponding harmonic template models.

Yen et al. proposed an approach using spectro-temporal modulation
features \[[255](#ref-yen14)\], \[[256](#ref-yen15)\]. They decomposed a
mixture using a two-stage auditory model which consists of a cochlear
module \[[257](#ref-chi05)\] and cortical module \[[258](#ref-chi99)\].
They then extracted spectro-temporal modulation features from the TF
units and clustered the TF units into harmonic, percussive, and vocal
components using the EM algorithm and resynthesized the estimated
signals.

Chan and Yang proposed an approach using an informed group sparse
representation \[[259](#ref-chan17)\]. They introduced a representation
built using a learned dictionary based on a chord sequence which
exhibits group sparsity \[[260](#ref-yuan06)\] and which can incorporate
melody annotations. They derived a formulation of the problem in a
manner similar to RPCA and solved it using the alternating direction
method of multipliers \[[261](#ref-ma16)\]. They also showed a relation
between their representation and the low-rank representation in
\[[123](#ref-yang13)\], \[[262](#ref-liu13)\].

### Shortcomings

The large body of literature we reviewed in the preceding sections is
concentrated on choosing adequate models for the lead and accompaniment
parts of music signals in order to devise effective signal processing
methods to achieve separation. From a higher perspective, their common
feature is to guide the separation process in a *model-based way*:
first, the scientist has some idea regarding characteristics of the lead
signal and/or the accompaniment, and then an algorithm is designed to
exploit this knowledge for separation.

Model-based methods for lead and accompaniment separation are faced with
a common risk that their core assumptions will be violated for the
signal under study. For instance, the lead to be separated may not be
harmonic but saturated vocals or the accompaniment may not be repetitive
or redundant, but rather always changing. In such cases, model-based
methods are prone to large errors and poor performance.

## Data-driven approaches

A way to address the potential caveats of model-based separation
behaving badly in case of violated assumptions is to avoid making
assumptions altogether, but rather to let the model be learned from a
large and representative database of examples. This line of research
leads to *data-driven* methods, for which researchers are concerned
about directly estimating a mapping between the mixture and either the
TF mask for separating the sources, or their spectrograms to be used for
designing a filter.

As may be foreseen, this strategy based on machine learning comes with
several challenges of its own. First, it requires considerable amounts
of data. Second, it typically requires a high-capacity learner (many
tunable parameters) that can be prone to over-fitting the training data
and therefore not working well on the audio it faces when deployed.


### Algebraic approaches

A natural way to exploit a training database was to learn some parts of
the model to guide the estimation process into better solutions. Work on
this topic may be traced back to the suggestion of Ozerov et al. in
\[[276](#ref-ozerov05)\] to learn spectral template models based on a
database of isolated sources, and then to adapt this dictionary of
templates on the mixture using the method in \[[277](#ref-tsai04)\].

The exploitation of training data was formalized by Smaragdis et al. in
\[[110](#ref-smaragdis07)\] in the context of source separation within
the supervised and semi-supervised PLCA framework. The core idea of this
probabilistic formulation, equivalent to NMF, is to learn some spectral
bases from the training set which are then kept fixed at separation
time.

In the same line, Ozerov et al. proposed an approach using Bayesian
models \[[191](#ref-ozerov07)\]. They first segmented a song into vocal
and non-vocal parts using GMMs with MFCCs. Then, they adapted a general
music model on the non-vocal parts of a particular song by using the
maximum a posteriori (MAP) adaptation approach in
\[[278](#ref-gauvain94)\]

Ozerov et al. later proposed a framework for source separation which
generalizes several approaches given prior information about the problem
and showed its application for singing voice separation
\[[210](#ref-ozerov102)\]–\[[212](#ref-salaun14)\]. They chose the local
Gaussian model \[[279](#ref-vincent10)\] as the core of the framework
and allowed the prior knowledge about each source and its mixing
characteristics using user-specified constraints. Estimation was
performed through a generalized EM algorithm \[[32](#ref-dempster77)\].

Rafii et al. proposed in \[[280](#ref-rafii132)\] to address the main
drawback of the repetition-based methods described in
Section [4.3](#ssec:methods_repet), which is the weakness of the model
for vocals. For this purpose, they combined the REPET-SIM model
\[[135](#ref-rafii12)\] for the accompaniment with a NMF-based model for
singing voice learned from a voice dataset.

As yet another example of using training data for NMF,
Boulanger-Lewandowski et al. proposed in
\[[281](#ref-boulanger-lewandowski14)\] to exploit long-term temporal
dependencies in NMF, embodied using recurrent neural networks (RNN)
\[[236](#ref-rumelhart86)\]. They incorporated RNN regularization into
the NMF framework to temporally constrain the activity matrix during the
decomposition, which can be seen as a generalization of the non-negative
HMM in \[[282](#ref-mysore10)\]. Furthermore, they used supervised and
semi-supervised NMF algorithms on isolated sources to train the models,
as in \[[110](#ref-smaragdis07)\].

### Deep neural networks

![](https://docs.google.com/drawings/d/e/2PACX-1vRXc_l4uNUTSOoAif8r4O-AKfAVBBMUSPVG_VMu79LjcZLb4xKLgFTVoSqVodvGetEvdeakfb4Nul-3/pub?w=720)

##### General architecture for methods exploiting deep learning. The network inputs the mixture and outputs either the sources spectrograms or a TF mask. Methods usually differ in their choice for a network architecture and the way it is learned using the training data.

Taking advantage of the recent availability of sufficiently large
databases of isolated vocals along with their accompaniment, several
researchers investigated the use of machine learning methods to directly
estimate a mapping between the mixture and the sources. Although
end-to-end systems inputting and outputting the waveforms have already
been proposed in the speech community \[[283](#ref-qian17)\], they are
not yet available for music source separation. This may be due to the
relative small size of music separation databases, at most 10 h today.
Instead, most systems feature pre and post-processing steps that consist
in computing classical TF representations and building TF masks,
respectively. Although such end-to-end systems will inevitably be
proposed in the near future, the common structure of deep learning
methods for lead and accompaniment separation usually corresponds for
now to the one depicted in
Figure [\[fig:methods\_dnn\]](#fig:methods_dnn). From a general
perspective, we may say that most current methods mainly differ in the
structure picked for the network, as well as in the way it is learned.

Providing a thorough introduction to deep neural networks is out of the
scope of this paper. For our purpose, it suffices to mention that they
consist of a cascade of several possibly non-linear transformations of
the input, which are learned during a training stage. They were shown to
effectively learn representations and mappings, provided enough data is
available for estimating their parameters
\[[284](#ref-deng14)\]–\[[286](#ref-goodfellow16)\]. Different
architectures for neural networks may be combined/cascaded together, and
many architectures were proposed in the past, such as feedforward
fully-connected neural networks (FNN), convolutional neural networks
(CNN), or RNN and variants such as the long short-term memory (LSTM) and
the gated-recurrent units (GRU). Training of such functions is achieved
by stochastic gradient descent \[[287](#ref-robbins51)\] and associated
algorithms, such as backpropagation \[[288](#ref-rumelhart862)\] or
backpropagation through time \[[236](#ref-rumelhart86)\] for the case of
RNNs.

To the best of our knowledge, Huang et al. were the first to propose
deep neural networks, RNNs here \[[289](#ref-hermans13)\],
\[[290](#ref-pascanu14)\], for singing voice separation in
\[[248](#ref-huang14)\], \[[291](#ref-huang15)\]. They adapted their
framework from \[[292](#ref-huang142)\] to model all sources
simultaneously through masking. Input and target functions were the
mixture magnitude and a joint representation of the individual sources.
The objective was to estimate jointly either singing voice and
accompaniment music, or speech and background noise from the
corresponding mixtures.

Modeling the temporal structures of both the lead and the accompaniment
is a considerable challenge, even when using DNN methods. As an
alternative to the RNN approach proposed by Huang et al. in
\[[248](#ref-huang14)\], Uhlich et al. proposed the usage of FNNs
\[[293](#ref-uhlich15)\] whose input consists of *supervectors* of a few
consecutive frames from the mixture spectrogram. Later in
\[[294](#ref-uhlich17)\], the same authors considered the use of
bi-directional LSTMs for the same task.

In an effort to make the resulting system less computationally demanding
at separation time but still incorporating dynamic modeling of audio,
Simpson et al. proposed in \[[295](#ref-simpson15)\] to predict binary
TF masks using deep CNNs, which typically utilize fewer parameters than
the FNNs. Similarly, Schlueter proposed a method trained to detect
singing voice using CNNs \[[296](#ref-schlueter16)\]. In that case, the
trained network was used to compute *saliency maps* from which TF masks
can be computed for singing voice separation. Chandna et al. also
considered CNNs for lead separation in \[[297](#ref-chandna17)\], with a
particular focus on low-latency.

The classical FNN, LSTM and CNN structures above served as baseline
structures over which some others tried to improve. As a first example,
Mimilakis et al. proposed to use a hybrid structure of FNNs with skip
connections to separate the lead instrument for purposes of remixing
jazz recordings \[[298](#ref-mimilakis16)\]. Such skip connections allow
to propagate the input spectrogram to intermediate representations
within the network, and mask it similarly to the operation of TF masks.
As advocated, this enforces the networks to approximate a TF masking
process. Extensions to temporal data for singing voice separation were
presented in \[[299](#ref-mimilakis17)\], \[[300](#ref-mimilakis172)\].
Similarly, Jansson et al. proposed to propagate the spectral information
computed by convolutional layers to intermediate representations
\[[301](#ref-jansson17)\]. This propagation aggregates intermediate
outputs to proceeding layer(s). The output of the last layer is
responsible for masking the input mixture spectrogram. In the same vein,
Takahashi et al. proposed to use skip connections via element-wise
addition through representations computed by
CNNs \[[302](#ref-takahashi17)\].

Apart from the structure of the network, the way it is trained,
comprising how the targets are computed, has a tremendous impact on
performance. As we saw, most methods operate on defining TF masks or
estimating magnitude spectrograms. However, other methods were proposed
based on deep clustering \[[303](#ref-hershey16)\],
\[[304](#ref-isik16)\], where TF mask estimation is seen as a clustering
problem. Luo et al. investigated both approaches in
\[[305](#ref-luo17)\] by proposing deep bidirectional LSTM networks
capable of outputting both TF masks or features to use as in deep
clustering. Kim and Smaragdis proposed in \[[306](#ref-kim15)\] another
way to learn the model, in a denoising auto-encoding fashion
\[[307](#ref-vincentp10)\], again utilizing short segments of the
mixture spectrogram as an input to the network, as in
\[[293](#ref-uhlich15)\].

As the best network structure may vary from one track to another, some
authors considered a fusion of methods, in a manner similar to the
method \[[242](#ref-jaureguiberry13)\] presented above. Grais et.
al \[[308](#ref-grais16)\], \[[309](#ref-grais162)\] proposed to
aggregate the results from an ensemble of feedforward DNNs to predict TF
masks for separation. An improvement was presented in
\[[310](#ref-grais17)\], \[[311](#ref-grais172)\] where the inputs to
the fusion network were separated signals, instead of TF masks, aiming
at enhancing the reconstruction of the separated sources.

As can be seen the use of deep learning methods for the design of lead
and accompaniment separation has already stimulated a lot of research,
although it is still in its infancy. Interestingly, we also note that
using audio and music specific knowledge appears to be fundamental in
designing effective systems. As an example of this, the contribution
from Nie et al. in \[[312](#ref-nie15)\] was to include the construction
of the TF mask as an extra non-linearity included in a recurrent
network. This is an exemplar of where signal processing elements, such
as filtering through masking, are incorporated as a building block of
the machine learning method.

The network structure is not the only thing that can benefit from audio
knowledge for better separation. The design of appropriate features is
another. While we saw that supervectors of spectrogram patches offered
the ability to effectively model time-context information in
FNNs \[[293](#ref-uhlich15)\], Sebastian and
Murthy \[[313](#ref-sebastian16)\] proposed the use of the modified
group delay feature representation \[[314](#ref-yegnanarayana91)\] in
their deep RNN architecture. They applied their approach for both
singing voice and vocal-violin separation.

Finally, as with other methods, DNN-based separation techniques can also
be combined with others to yield improved performance. As an example,
Fan et al. proposed to use DNNs to separate the singing voice and to
also exploit vocal pitch estimation \[[315](#ref-fan16)\]. They first
extracted the singing voice using feedforward DNNs with sigmoid
activation functions. They then estimated the vocal pitch from the
extracted singing voice using dynamic programming.

### Shortcomings

Data-driven methods are nowadays the topic of important research
efforts, particularly those based on DNNs. This is notably due to their
impressive performance in terms of separation quality, as can, for
instance, be noticed below in Section [8](#sec:evaluation). However,
they also come with some limitations.

First, we highlighted that lead and accompaniment separation in music
has the very specific problem of scarce data. Since it is very hard to
gather large amounts of training data for that application, it is hard
to fully exploit learning methods that require large training sets. This
raises very specific challenges in terms of machine learning.

Second, the lack of interpretability of model parameters is often
mentioned as a significant shortcoming when it comes to applications.
Indeed, music engineering systems are characterized by a strong
importance of human-computer interactions, because they are used in an
artistic context that may require specific needs or results. As of
today, it is unclear how to provide user interaction for controlling the
millions of parameters of DNN-based systems.

## Including multichannel information

In describing the above methods, we have not discussed the fact that
music signals are typically stereophonic. On the contrary, the bulk of
methods we discussed focused on designing good spectrogram models for
the purpose of filtering mixtures that may be *monophonic*. Such a
strategy is called *single-channel* source separation and is usually
presented as more challenging than multichannel source separation.
Indeed, only TF structure may then be used to discriminate the
accompaniment from the lead. In stereo recordings, one further so-called
*spatial* dimension is introduced, which is sometimes referred to as
*pan*, that corresponds to the perceived *position* of a source in the
stereo field. Devising methods to exploit this spatial diversity for
source separation has also been the topic of an important body of
research that we review now.

### Extracting the lead based on panning

In the case of popular music signals, a fact of paramount practical
importance is that the lead signal — such as vocals — is very often
mixed *in the center*, which means that its energy is approximately the
same in left and right channels. On the contrary, other instruments are
often mixed at positions to the left or right of the stereo field.

![](https://docs.google.com/drawings/d/e/2PACX-1vT6DxnIs8i-BCZblC-rKuOOvI7ZRnlykXKiBznkuYrPbMANQohbPaF9vsM73J3Oobew7z3211WpaeS5/pub?w=720)

##### Separation of the lead based on panning information. A stereo cue called panning allows to design a TF mask.

The general structure of methods extracting the lead based on stereo
cues is displayed on
Figure [\[fig:methods\_panning\]](#fig:methods_panning), introduced by
Avendano, who proposed to separate sources in stereo mixtures by using a
panning index \[[316](#ref-avendano03)\]. He derived a two-dimensional
map by comparing left and right channels in the TF domain to identify
the different sources based on their panning position
\[[317](#ref-avendano02)\]. The same methodology was considered by Barry
et al. in \[[318](#ref-barry04)\] in his Azimuth Discrimination and
Resynthesis (ADRess) approach, with panning indexes computed with
differences instead of ratios.

Vinyes et al. also proposed to unmix commercially produced music
recordings thanks to stereo cues \[[319](#ref-vinyes06)\]. They designed
an interface similar to \[[318](#ref-barry04)\] where a user can set
some parameters to generate different TF filters in real time. They
showed applications for extracting various instruments, including
vocals.

Cobos and López proposed to separate sources in stereo mixtures by using
TF masking and multilevel thresholding \[[320](#ref-cobos082)\]. They
based their approach on the Degenerate Unmixing Estimation Technique
(DUET) \[[321](#ref-yilmaz04)\]. They first derived histograms by
measuring the amplitude relationship between TF points in left and right
channels. Then, they obtained several thresholds using the multilevel
extension of Otsu’s method \[[322](#ref-otsu79)\]. Finally, TF points
were assigned to their related sources to produce TF masks.

Sofianos et al. proposed to separate the singing voice from a stereo
mixture using ICA \[[323](#ref-sofianos10)\]–\[[325](#ref-sofianos12)\].
They assumed that most commercial songs have the vocals panned to the
center and that they dominate the other sources in amplitude. In
\[[323](#ref-sofianos10)\], they proposed to combine a modified version
of ADRess with ICA to filter out the other instruments. In
\[[324](#ref-sofianos102)\], they proposed a modified version without
ADRess.

Kim et al. proposed to separate centered singing voice in stereo music
by exploiting binaural cues, such as inter-channel level and
inter-channel phase difference \[[326](#ref-kim11)\]. To this end, they
build the pan-based TF mask through an EM algorithm, exploiting a GMM
model on these cues.

### Augmenting models with stereo

As with using only a harmonic model for the lead signal, using stereo
cues in isolation is not always sufficient for good separation, as there
can often be multiple sources at the same spatial location. Combining
stereo cues with other methods improves performance in these cases.

Cobos and López proposed to extract singing voice by combining panning
information and pitch tracking \[[327](#ref-cobos08)\]. They first
obtained an estimate for the lead thanks to a pan-based method such as
\[[316](#ref-avendano03)\], and refined the singing voice by using a TF
binary mask based on comb-filtering method as in
Section [3.2](#ssec:harmonicity-combfiltering). The same combination
was proposed by Marxer et al. in \[[87](#ref-marxer12)\] in a
low-latency context, with different methods used for the binaural cues
and pitch tracking blocks.

FitzGerald proposed to combine approaches based on repetition and
panning to extract stereo vocals \[[328](#ref-fitzgerald13)\]. He first
used his nearest neighbors median filtering algorithm
\[[139](#ref-fitzgerald12)\] to separate vocals and accompaniment from a
stereo mixture. He then used the ADRess algorithm
\[[318](#ref-barry04)\] and a high-pass filter to refine the vocals and
improve the accompaniment. In a somewhat different manner, FitzGerald
and Jaiswal also proposed to combine approaches based on repetition and
panning to improve stereo accompaniment recovery
\[[329](#ref-fitzgerald132)\]. They presented an audio inpainting scheme
\[[330](#ref-alder12)\] based on the nearest neighbors and median
filtering algorithm \[[139](#ref-fitzgerald12)\] to recover TF regions
of the accompaniment assigned to the vocals after using a source
separation algorithm based on panning information.

In a more theoretically grounded manner, several methods based on a
probabilistic model were generalized to the multichannel case. For
instance, Durrieu et al. extended their source-filter model in
\[[201](#ref-durrieu11)\], \[[205](#ref-durrieu092)\] to handle stereo
signals, by incorporating the panning coefficients as model parameters
to be estimated.

Ozerov and Févotte proposed a multichannel NMF framework with
application to source separation, including vocals and music
\[[331](#ref-ozerov09)\], \[[332](#ref-ozerov10)\]. They adopted a
statistical model where each source is represented as a sum of Gaussian
components \[[193](#ref-benaroya032)\], and where maximum likelihood
estimation of the parameters is equivalent to NMF with the Itakura-Saito
divergence \[[94](#ref-fevotte09)\]. They proposed two methods for
estimating the parameters of their model, one that maximized the
likelihood of the multichannel data using EM, and one that maximized the
sum of the likelihoods of all channels using a multiplicative update
algorithm inspired by NMF \[[90](#ref-lee99)\].

Ozerov et al. then proposed a multichannel non-negative tensor
factorization (NTF) model with application to user-guided source
separation \[[333](#ref-ozerov11)\]. They modeled the sources jointly by
a 3-valence tensor (time/frequency/source) as in
\[[334](#ref-liutkus10)\] which extends the multichannel NMF model in
\[[332](#ref-ozerov10)\]. They used a generalized EM algorithm based on
multiplicative updates \[[335](#ref-fevotte10)\] to minimize the
objective function. They incorporated information about the temporal
segmentation of the tracks and the number of components per track.
Ozerov et al. later proposed weighted variants of NMF and NTF with
application to user-guided source separation, including separation of
vocals and music \[[241](#ref-ozerov13)\], \[[336](#ref-ozerov14)\].

Sawada et al. also proposed multichannel extensions of NMF, tested for
separating stereo mixtures of multiple sources, including vocals and
accompaniment \[[337](#ref-sawada11)\]–\[[339](#ref-sawada13)\]. They
first defined multichannel extensions of the cost function, namely,
Euclidean distance and Itakura-Saito divergence, and derived
multiplicative update rules accordingly. They then proposed two
techniques for clustering the bases, one built into the NMF model and
one performing sequential pair-wise merges.

Finally, multichannel information was also used with DNN models. Nugraha
et al. addressed the problem of multichannel source separation for
speech enhancement \[[340](#ref-sivasankaran15)\],
\[[341](#ref-nugraha162)\] and music separation
\[[342](#ref-nugraha15)\], \[[343](#ref-nugraha16)\]. In this framework,
DNNs are still used for the spectrograms, while more classical EM
algorithms \[[344](#ref-duong10)\], \[[345](#ref-ozerov112)\] are used
for estimating the spatial parameters.

### Shortcomings

When compared to simply processing the different channels independently,
incorporating spatial information in the separation method often comes
at the cost of additional computational complexity. The resulting
methods are indeed usually more demanding in terms of computing power,
because they involve the design of beamforming filters and inversion of
covariance matrices. While this is not really an issue for stereophonic
music, this may become prohibiting in configurations with higher numbers
of channels

## References

<div id="refs" class="references">

<div id="ref-kalakota00">

\[1\] R. Kalakota and M. Robinson, *E-business 2.0: Roadmap for
success*. Addison-Wesley Professional, 2000.

</div>

<div id="ref-lam01">

\[2\] C. K. Lam and B. C. Tan, “The Internet is changing the music
industry,” *Communications of the ACM*, vol. 44, no. 8, pp. 62–68, 2001.

</div>

<div id="ref-common10">

\[3\] P. Common and C. Jutten, *Handbook of blind source separation*.
Academic Press, 2010.

</div>

<div id="ref-naik14">

\[4\] G. R. Naik and W. Wang, *Blind source separation*. Springer-Verlag
Berlin Heidelberg, 2014.

</div>

<div id="ref-hyvarinen99">

\[5\] A. Hyvärinen, “Fast and robust fixed-point algorithm for
independent component analysis,” *IEEE Transactions on Neural Networks*,
vol. 10, no. 3, pp. 626–634, May 1999.

</div>

<div id="ref-hyvarinen00">

\[6\] A. Hyvärinen and E. Oja, “Independent component analysis:
Algorithms and applications,” *Neural Networks*, vol. 13, nos. 4-5, pp.
411–430, Jun. 2000.

</div>

<div id="ref-makino07">

\[7\] S. Makino, T.-W. Lee, and H. Sawada, *Blind speech separation*.
Springer Netherlands, 2007.

</div>

<div id="ref-vincent18">

\[8\] E. Vincent, T. Virtanen, and S. Gannot, *Audio source separation
and speech enhancement*. Wiley, 2018.

</div>

<div id="ref-loizou13">

\[9\] P. C. Loizou, *Speech enhancement: Theory and practice*. CRC
Press, 1990.

</div>

<div id="ref-liutkus13">

\[10\] A. Liutkus, J.-L. Durrieu, L. Daudet, and G. Richard, “An
overview of informed audio source separation,” in *14th international
workshop on image analysis for multimedia interactive services*, 2013.

</div>

<div id="ref-vincent14">

\[11\] E. Vincent, N. Bertin, R. Gribonval, and F. Bimbot, “From blind
to guided audio source separation: How models and side information can
improve the separation of sound,” *IEEE Signal Processing Magazine*,
vol. 31, no. 3, pp. 107–115, May 2014.

</div>

<div id="ref-zolzer11">

\[12\] U. Zölzer, *DAFX - digital audio effects*. Wiley, 2011.

</div>

<div id="ref-muller2015">

\[13\] M. Müller, *Fundamentals of music processing: Audio, analysis,
algorithms, applications*. Springer, 2015.

</div>

<div id="ref-jaynes2003probability">

\[14\] E. T. Jaynes, *Probability theory: The logic of science*.
Cambridge university press, 2003.

</div>

<div id="ref-cappe2005">

\[15\] O. Cappé, E. Moulines, and T. Ryden, *Inference in hidden markov
models (springer series in statistics)*. Secaucus, NJ, USA:
Springer-Verlag New York, Inc., 2005.

</div>

<div id="ref-mcaulay86">

\[16\] R. J. McAulay and T. F. Quatieri, “Speech analysis/synthesis
based on a sinusoidal representation,” *IEEE Transactions on Audio,
Speech, and Language Processing*, vol. 34, no. 4, pp. 744–754, Aug.
1986.

</div>

<div id="ref-rickard02">

\[17\] S. Rickard and O. Yilmaz, “On the approximate w-disjoint
orthogonality of speech,” in *IEEE international conference on
acoustics, speech, and signal processing*, 2002.

</div>

<div id="ref-boll1979">

\[18\] S. Boll, “Suppression of acoustic noise in speech using spectral
subtraction,” *IEEE Transactions on acoustics, speech, and signal
processing*, vol. 27, no. 2, pp. 113–120, 1979.

</div>

<div id="ref-wiener1975">

\[19\] N. Wiener, “Extrapolation, interpolation, and smoothing of
stationary time series,” 1975.

</div>

<div id="ref-liutkus15c">

\[20\] A. Liutkus and R. Badeau, “Generalized Wiener filtering with
fractional power spectrograms,” in *IEEE international conference on
acoustics, speech and signal processing*, 2015.

</div>

<div id="ref-fant70">

\[21\] G. Fant, *Acoustic theory of speech production*. Walter de
Gruyter, 1970.

</div>

<div id="ref-bogert1963">

\[22\] B. P. Bogert, M. J. R. Healy, and J. W. Tukey, “The quefrency
alanysis of time series for echoes: Cepstrum pseudo-autocovariance,
cross-cepstrum, and saphe cracking,” *Proceedings of a symposium on time
series analysis*, pp. 209–243, 1963.

</div>

<div id="ref-noll64">

\[23\] A. M. Noll, “Short-time spectrum and ‘cepstrum’ techniques for
vocal-pitch detection,” *Journal of the Acoustical Society of America*,
vol. 36, no. 2, pp. 296–302, 1964.

</div>

<div id="ref-noll67">

\[24\] A. M. Noll, “Cepstrum pitch determination,” *Journal of the
Acoustical Society of America*, vol. 41, no. 2, pp. 293–309, 1967.

</div>

<div id="ref-david80">

\[25\] S. B. Davis and P. Mermelstein, “Comparison of parametric
representations for monosyllabic word recognition in continuously spoken
sentences,” *IEEE Transactions on Audio, Speech, and Language
Processing*, vol. 28, no. 4, pp. 357–366, Aug. 1980.

</div>

<div id="ref-oppenheim69">

\[26\] A. V. Oppenheim, “Speech analysis-synthesis system based on
homomorphic filtering,” *Journal of the Acoustical Society of America*,
vol. 45, no. 2, pp. 458–465, 1969.

</div>

<div id="ref-durrett2010probability">

\[27\] R. Durrett, *Probability: Theory and examples*. Cambridge
university press, 2010.

</div>

<div id="ref-schwarz78">

\[28\] G. Schwarz, “Estimating the dimension of a model,” *Annals of
Statistics*, vol. 6, no. 2, pp. 461–464, Mar. 1978.

</div>

<div id="ref-rabiner89">

\[29\] L. R. Rabiner, “A tutorial on hidden Markov models and selected
applications in speech recognition,” *Proceedings of the IEEE*, vol. 77,
no. 2, pp. 257–286, Feb. 1989.

</div>

<div id="ref-viterbi2006">

\[30\] A. J. Viterbi, “A personal history of the Viterbi algorithm,”
*IEEE Signal Processing Magazine*, vol. 23, no. 4, pp. 120–142, 2006.

</div>

<div id="ref-bishop96">

\[31\] C. Bishop, *Neural networks for pattern recognition*. Clarendon
Press, 1996.

</div>

<div id="ref-dempster77">

\[32\] A. P. Dempster, N. M. Laird, and D. B. Rubin, “Maximum likelihood
from incomplete data via the EM algorithm,” *Journal of the Royal
Statistical Society*, vol. 39, no. 1, pp. 1–38, 1977.

</div>

<div id="ref-salamon14">

\[33\] J. Salamon, E. Gómez, D. Ellis, and G. Richard, “Melody
extraction from polyphonic music signals: Approaches, applications and
challenges,” *IEEE Signal Processing Magazine*, vol. 31, 2014.

</div>

<div id="ref-miller73">

\[34\] N. J. Miller, “Removal of noise from a voice signal by
synthesis,” Utah University, 1973.

</div>

<div id="ref-oppenheim68">

\[35\] A. V. Oppenheim and R. W. Schafer, “Homomorphic analysis of
speech,” *IEEE Transactions on Audio and Electroacoustics*, vol. 16, no.
2, pp. 221–226, Jun. 1968.

</div>

<div id="ref-maher89">

\[36\] R. C. Maher, “An approach for the separation of voices in
composite musical signals,” PhD thesis, University of Illinois at
Urbana-Champaign, 1989.

</div>

<div id="ref-wang94">

\[37\] A. L. Wang, “Instantaneous and frequency-warped techniques for
auditory source separation,” PhD thesis, Stanford University, 1994.

</div>

<div id="ref-wang95">

\[38\] A. L. Wang, “Instantaneous and frequency-warped techniques for
source separation and signal parametrization,” in *IEEE workshop on
applications of signal processing to audio and acoustics*, 1995.

</div>

<div id="ref-meron98">

\[39\] Y. Meron and K. Hirose, “Separation of singing and piano sounds,”
in *5th international conference on spoken language processing*, 1998.

</div>

<div id="ref-quatieri92">

\[40\] T. F. Quatieri, “Shape invariant time-scale and pitch
modification of speech,” *IEEE Transactions on Signal Processing*, vol.
40, no. 3, pp. 497–510, Mar. 1992.

</div>

<div id="ref-ben-shalom04">

\[41\] A. Ben-Shalom and S. Dubnov, “Optimal filtering of an instrument
sound in a mixed recording given approximate pitch prior,” in
*International computer music conference*, 2004.

</div>

<div id="ref-shalev-shwartz02">

\[42\] S. Shalev-Shwartz, S. Dubnov, N. Friedman, and Y. Singer, “Robust
temporal and spectral modeling for query by melody,” in *25th annual
international acm sigir conference on research and development in
information retrieval*, 2002.

</div>

<div id="ref-serra97">

\[43\] X. Serra, “Musical sound modeling with sinusoids plus noise,” in
*Musical signal processing*, Swets & Zeitlinger, 1997, pp. 91–122.

</div>

<div id="ref-vanveen97">

\[44\] B. V. Veen and K. M. Buckley, “Beamforming techniques for spatial
filtering,” in *The digital signal processing handbook*, CRC Press,
1997, pp. 1–22.

</div>

<div id="ref-zhang05">

\[45\] Y.-G. Zhang and C.-S. Zhang, “Separation of voice and music by
harmonic structure stability analysis,” in *IEEE international
conference on multimedia and expo*, 2005.

</div>

<div id="ref-zhang06">

\[46\] Y.-G. Zhang and C.-S. Zhang, “Separation of music signals by
harmonic structure modeling,” in *Advances in neural information
processing systems 18*, MIT Press, 2006, pp. 1617–1624.

</div>

<div id="ref-terhardt79">

\[47\] E. Terhardt, “Calculating virtual pitch,” *Hearing Research*,
vol. 1, no. 2, pp. 155–182, Mar. 1979.

</div>

<div id="ref-zhang03">

\[48\] Y.-G. Zhang, C.-S. Zhang, and S. Wang, “Clustering in knowledge
embedded space,” in *Machine learning: ECML 2003*, Springer Berlin
Heidelberg, 2003, pp. 480–491.

</div>

<div id="ref-fujihara05">

\[49\] H. Fujihara, T. Kitahara, M. Goto, K. Komatani, T. Ogata, and H.
G. Okuno, “Singer identification based on accompaniment sound reduction
and reliable frame selection,” in *6th international conference on music
information retrieval*, 2005.

</div>

<div id="ref-fujihara10">

\[50\] H. Fujihara, M. Goto, T. Kitahara, and H. G. Okuno, “A modeling
of singing voice robust to accompaniment sounds and its application to
singer identification and vocal-timbre-similarity-based music
information retrieval,” *IEEE Transactions on Audio, Speech, and
Language Processing*, vol. 18, no. 3, pp. 638–648, Mar. 2010.

</div>

<div id="ref-goto04">

\[51\] M. Goto, “A real-time music-scene-description system:
Predominant-F0 estimation for detecting melody and bass lines in
real-world audio signals,” *Speech Communication*, vol. 43, no. 4, pp.
311–329, Sep. 2004.

</div>

<div id="ref-moorer05">

\[52\] J. A. Moorer, “Signal processing aspects of computer music: A
survey,” *Proceedings of the IEEE*, vol. 65, no. 8, pp. 1108–1137, Aug.
2005.

</div>

<div id="ref-mesaros07">

\[53\] A. Mesaros, T. Virtanen, and A. Klapuri, “Singer identification
in polyphonic music using vocal separation and pattern recognition
methods,” in *7th international conference on music information
retrieval*, 2007.

</div>

<div id="ref-ryynanen06">

\[54\] M. Ryynänen and A. Klapuri, “Transcription of the singing melody
in polyphonic music,” in *7th international conference on music
information retrieval*, 2006.

</div>

<div id="ref-duan08">

\[55\] Z. Duan, Y.-F. Zhang, C.-S. Zhang, and Z. Shi, “Unsupervised
single-channel music source separation by average harmonic structure
modeling,” *IEEE Transactions on Audio, Speech, and Language
Processing*, vol. 16, no. 4, pp. 766–778, May 2008.

</div>

<div id="ref-rodet97">

\[56\] X. Rodet, “Musical sound signal analysis/synthesis:
Sinusoidal+Residual and elementary waveform models,” in *IEEE
time-frequency and time-scale workshop*, 1997.

</div>

<div id="ref-smith87">

\[57\] J. O. Smith and X. Serra, “PARSHL: An analysis/synthesis program
for non-harmonic sounds based on a sinusoidal representation,” in
*International computer music conference*, 1987.

</div>

<div id="ref-slaney94">

\[58\] M. Slaney, D. Naar, and R. F. Lyon, “Auditory model inversion for
sound separation,” in *IEEE international conference on acoustics,
speech and signal processing*, 1994.

</div>

<div id="ref-lagrange07">

\[59\] M. Lagrange and G. Tzanetakis, “Sound source tracking and
formation using normalized cuts,” in *IEEE international conference on
acoustics, speech and signal processing*, 2007.

</div>

<div id="ref-lagrange08">

\[60\] M. Lagrange, L. G. Martins, J. Murdoch, and G. Tzanetakis,
“Normalized cuts for predominant melodic source separation,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 16, no. 2,
pp. 278–290, Feb. 2008.

</div>

<div id="ref-shi00">

\[61\] J. Shi and J. Malik, “Normalized cuts and image segmentation,”
*IEEE Transactions on Pattern Analysis and Machine Intelligence*, vol.
22, no. 8, pp. 888–905, Aug. 2000.

</div>

<div id="ref-ryynanen08">

\[62\] M. Ryynänen, T. Virtanen, J. Paulus, and A. Klapuri,
“Accompaniment separation and karaoke application based on automatic
melody transcription,” in *IEEE international conference on multimedia
and expo*, 2008.

</div>

<div id="ref-ryynanen082">

\[63\] M. Ryynänen and A. Klapuri, “Automatic transcription of melody,
bass line, and chords in polyphonic music,” *Computer Music Journal*,
vol. 32, no. 3, pp. 72–86, Sep. 2008.

</div>

<div id="ref-ding97">

\[64\] Y. Ding and X. Qian, “Processing of musical tones using a
combined quadratic polynomial-phase sinusoid and residual (QUASAR)
signal model,” *Journal of the Audio Engineering Society*, vol. 45, no.
7/8, pp. 571–584, Jul. 1997.

</div>

<div id="ref-li06">

\[65\] Y. Li and D. Wang, “Singing voice separation from monaural
recordings,” in *7th international conference on music information
retrieval*, 2006.

</div>

<div id="ref-li07">

\[66\] Y. Li and D. Wang, “Separation of singing voice from music
accompaniment for monaural recordings,” *IEEE Transactions on Audio,
Speech, and Language Processing*, vol. 15, no. 4, pp. 1475–1487, May
2007.

</div>

<div id="ref-duxbury03">

\[67\] C. Duxbury, J. P. Bello, M. Davies, and M. Sandler, “Complex
domain onset detection for musical signals,” in *6th international
conference on digital audio effects*, 2003.

</div>

<div id="ref-li05">

\[68\] Y. Li and D. Wang, “Detecting pitch of singing voice in
polyphonic audio,” in *IEEE international conference on acoustics,
speech and signal processing*, 2005.

</div>

<div id="ref-wu03">

\[69\] M. Wu, D. Wang, and G. J. Brown, “A multipitch tracking algorithm
for noisy speech,” *IEEE Transactions on Audio, Speech, and Language
Processing*, vol. 11, no. 3, pp. 229–241, May 2003.

</div>

<div id="ref-hu02">

\[70\] G. Hu and D. Wang, “Monaural speech segregation based on pitch
tracking and amplitude modulation,” *IEEE Transactions on Neural
Networks*, vol. 15, no. 5, pp. 1135–1150, Sep. 2002.

</div>

<div id="ref-han07">

\[71\] Y. Han and C. Raphael, “Desoloing monaural audio using mixture
models,” in *7th international conference on music information
retrieval*, 2007.

</div>

<div id="ref-roweis01">

\[72\] S. T. Roweis, “One microphone source separation,” in *Advances in
neural information processing systems 13*, MIT Press, 2001, pp. 793–799.

</div>

<div id="ref-hsu08">

\[73\] C.-L. Hsu, J.-S. R. Jang, and T.-L. Tsai, “Separation of singing
voice from music accompaniment with unvoiced sounds reconstruction for
monaural recordings,” in *AES 125th convention*, 2008.

</div>

<div id="ref-hsu10">

\[74\] C.-L. Hsu and J.-S. R. Jang, “On the improvement of singing voice
separation for monaural recordings using the MIR-1K dataset,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 18, no. 2,
pp. 310–319, Feb. 2010.

</div>

<div id="ref-dressler062">

\[75\] K. Dressler, “Sinusoidal extraction using an efficient
implementation of a multi-resolution FFT,” in *9th international
conference on digital audio effects*, 2006.

</div>

<div id="ref-scalart96">

\[76\] P. Scalart and J. V. Filho, “Speech enhancement based on a priori
signal to noise estimation,” in *IEEE international conference on
acoustics, speech and signal processing*, 1996.

</div>

<div id="ref-raphael08">

\[77\] C. Raphael and Y. Han, “A classifier-based approach to
score-guided music audio source separation,” *Computer Music Journal*,
vol. 32, no. 1, pp. 51–59, 2008.

</div>

<div id="ref-breiman84">

\[78\] L. Breiman, J. Friedman, C. J. Stone, and R. A. Olshen,
*Classification and regression trees*. Chapman; Hall/CRC, 1984.

</div>

<div id="ref-cano09">

\[79\] E. Cano and C. Cheng, “Melody line detection and source
separation in classical saxophone recordings,” in *12th international
conference on digital audio effects*, 2009.

</div>

<div id="ref-grollmisch11">

\[80\] S. Grollmisch, E. Cano, and C. Dittmar, “Songs2See: Learn to play
by playing,” in *AES 41st conference: Audio for games*, 2011, pp. P2–3.

</div>

<div id="ref-dittmar12">

\[81\] C. Dittmar, E. Cano, J. Abeßer, and S. Grollmisch, “Music
information retrieval meets music education,” in *Multimodal music
processing*, Dagstuhl Publishing, 2012, pp. 95–120.

</div>

<div id="ref-cano12">

\[82\] E. Cano, C. Dittmar, and G. Schuller, “Efficient implementation
of a system for solo and accompaniment separation in polyphonic music,”
in *20th european signal processing conference*, 2012.

</div>

<div id="ref-dressler11">

\[83\] K. Dressler, “Pitch estimation by the pair-wise evaluation of
spectral peaks,” in *42nd aes conference on semantic audio*, 2011.

</div>

<div id="ref-cano13">

\[84\] E. Cano, C. Dittmar, and G. Schuller, “Re-thinking sound
separation: Prior information and additivity constraints in separation
algorithms,” in *16th international conference on digital audio
effects*, 2013.

</div>

<div id="ref-cano14">

\[85\] E. Cano, G. Schuller, and C. Dittmar, “Pitch-informed solo and
accompaniment separation towards its use in music education
applications,” *EURASIP Journal on Advances in Signal Processing*, vol.
2014, no. 23, Sep. 2014.

</div>

<div id="ref-bosch12">

\[86\] J. J. Bosch, K. Kondo, R. Marxer, and J. Janer, “Score-informed
and timbre independent lead instrument separation in real-world
scenarios,” in *20th european signal processing conference*, 2012.

</div>

<div id="ref-marxer12">

\[87\] R. Marxer, J. Janer, and J. Bonada, “Low-latency instrument
separation in polyphonic audio using timbre models,” in *10th
international conference on latent variable analysis and signal
separation*, 2012.

</div>

<div id="ref-vaneph16">

\[88\] A. Vaneph, E. McNeil, and F. Rigaud, “An automated source
separation technology and its practical applications,” in *140th aes
convention*, 2016.

</div>

<div id="ref-leglaive15">

\[89\] S. Leglaive, R. Hennequin, and R. Badeau, “Singing voice
detection with deep recurrent neural networks,” in *IEEE international
conference on acoustics, speech and signal processing*, 2015.

</div>

<div id="ref-lee99">

\[90\] D. D. Lee and H. S. Seung, “Learning the parts of objects by
non-negative matrix factorization,” *Nature*, vol. 401, pp. 788–791,
Oct. 1999.

</div>

<div id="ref-lee01">

\[91\] D. D. Lee and H. S. Seung, “Algorithms for non-negative matrix
factorization,” in *Advances in neural information processing systems
13*, MIT Press, 2001, pp. 556–562.

</div>

<div id="ref-smaragdis03">

\[92\] P. Smaragdis and J. C. Brown, “Non-negative matrix factorization
for polyphonic music transcription,” in *IEEE workshop on applications
of signal processing to audio and acoustics*, 2003.

</div>

<div id="ref-virtanen07">

\[93\] T. Virtanen, “Monaural sound source separation by nonnegative
matrix factorization with temporal continuity and sparseness criteria,”
*IEEE Transactions on Audio, Speech, and Language Processing*, vol. 15,
no. 3, pp. 1066–1074, Mar. 2007.

</div>

<div id="ref-fevotte09">

\[94\] C. Févotte, “Nonnegative matrix factorization with the
Itakura-Saito divergence: With application to music analysis,” *Neural
Computation*, vol. 21, no. 3, pp. 793–830, Mar. 2009.

</div>

<div id="ref-common94">

\[95\] P. Common, “Independent component analysis, a new concept?”
*Signal Processing*, vol. 36, no. 3, pp. 287–314, Apr. 1994.

</div>

<div id="ref-vembu05">

\[96\] S. Vembu and S. Baumann, “Separation of vocals from polyphonic
audio recordings,” in *6th international conference on music information
retrieval*, 2005.

</div>

<div id="ref-hermansky90">

\[97\] H. Hermansky, “Perceptual linear predictive (PLP) analysis of
speech,” *Journal of the Acoustical Society of America*, vol. 87, no. 4,
pp. 1738–1752, Apr. 1990.

</div>

<div id="ref-nwe04">

\[98\] T. L. Nwe and Y. Wang, “Automatic detection of vocal segments in
popular songs,” in *5th international conference for music information
retrieval*, 2004.

</div>

<div id="ref-casey00">

\[99\] M. A. Casey and A. Westner, “Separation of mixed audio sources by
independent subspace analysis,” in *International computer music
conference*, 2000.

</div>

<div id="ref-chanrungutai08">

\[100\] A. Chanrungutai and C. A. Ratanamahatana, “Singing voice
separation for mono-channel music using non-negative matrix
factorization,” in *International conference on advanced technologies
for communications*, 2008.

</div>

<div id="ref-chanrungutai082">

\[101\] A. Chanrungutai and C. A. Ratanamahatana, “Singing voice
separation in mono-channel music,” in *International symposium on
communications and information technologies*, 2008.

</div>

<div id="ref-tikhonov63">

\[102\] A. N. Tikhonov, “Solution of incorrectly formulated problems and
the regularization method,” *Soviet Mathematics*, vol. 4, pp. 1035–1038,
1963.

</div>

<div id="ref-marxer122">

\[103\] R. Marxer and J. Janer, “A Tikhonov regularization method for
spectrum decomposition in low latency audio source separation,” in *IEEE
international conference on acoustics, speech and signal processing*,
2012.

</div>

<div id="ref-yang14">

\[104\] P.-K. Yang, C.-C. Hsu, and J.-T. Chien, “Bayesian singing-voice
separation,” in *15th international society for music information
retrieval conference*, 2014.

</div>

<div id="ref-chien15">

\[105\] J.-T. Chien and P.-K. Yang, “Bayesian factorization and learning
for monaural source separation,” *IEEE/ACM Transactions on Audio,
Speech, and Language Processing*, vol. 24, no. 1, pp. 185–195, Jan.
2015.

</div>

<div id="ref-cemgil09">

\[106\] A. T. Cemgil, “Bayesian inference for nonnegative matrix
factorisation models,” *Computational Intelligence and Neuroscience*,
vol. 2009, no. 4, pp. 1–17, Jan. 2009.

</div>

<div id="ref-schmidt09">

\[107\] M. N. Schmidt, O. Winther, and L. K. Hansen, “Bayesian
non-negative matrix factorization,” in *8th international conference on
independent component analysis and signal separation*, 2009.

</div>

<div id="ref-spiertz09">

\[108\] M. Spiertz and V. Gnann, “Source-filter based clustering for
monaural blind source separation,” in *12th international conference on
digital audio effects*, 2009.

</div>

<div id="ref-smaragdis09">

\[109\] P. Smaragdis and G. J. Mysore, “Separation by ‘humming’:
User-guided sound extraction from monophonic mixtures,” in *IEEE
workshop on applications of signal processing to audio and acoustics*,
2009.

</div>

<div id="ref-smaragdis07">

\[110\] P. Smaragdis, B. Raj, and M. Shashanka, “Supervised and
semi-supervised separation of sounds from single-channel mixtures,” in
*7th international conference on independent component analysis and
signal separation*, 2007.

</div>

<div id="ref-nakamuray15">

\[111\] T. Nakamuray and H. Kameoka, “\(L_p\)-norm non-negative matrix
factorization and its application to singing voice enhancement,” in
*IEEE international conference on acoustics, speech and signal
processing*, 2015.

</div>

<div id="ref-ortega70">

\[112\] J. M. Ortega and W. C. Rheinboldt, *Iterative solution of
nonlinear equations in several variables*. Academic Press, 1970.

</div>

<div id="ref-kameoka06">

\[113\] H. Kameoka, M. Goto, and S. Sagayama, “Selective amplifier of
periodic and non-periodic components in concurrent audio signals with
spectral control envelopes,” Information Processing Society of Japan,
2006.

</div>

<div id="ref-candes11">

\[114\] E. J. Candès, X. Li, Y. Ma, and J. Wright, “Robust principal
component analysis?” *Journal of the ACM*, vol. 58, no. 3, pp. 1–37, May
2011.

</div>

<div id="ref-huang12">

\[115\] P.-S. Huang, S. D. Chen, P. Smaragdis, and M. Hasegawa-Johnson,
“Singing-voice separation from monaural recordings using robust
principal component analysis,” in *IEEE international conference on
acoustics, speech and signal processing*, 2012.

</div>

<div id="ref-sprechmann12">

\[116\] P. Sprechmann, A. Bronstein, and G. Sapiro, “Real-time online
singing voice separation from monaural recordings using robust low-rank
modeling,” in *13th international society for music information
retrieval conference*, 2012.

</div>

<div id="ref-recht10">

\[117\] B. Recht, M. Fazel, and P. A. Parrilo, “Guaranteed minimum-rank
solutions of linear matrix equations via nuclear norm minimization,”
*SIAM Review*, vol. 52, no. 3, pp. 471–501, Aug. 2010.

</div>

<div id="ref-recht13">

\[118\] B. Recht and C. Ré, “Parallel stochastic gradient algorithms for
large-scale matrix completion,” *Mathematical Programming Computation*,
vol. 5, no. 2, pp. 201–226, Jun. 2013.

</div>

<div id="ref-gregor10">

\[119\] K. Gregor and Y. LeCun, “Learning fast approximations of sparse
coding,” in *27th international conference on machine learning*, 2010.

</div>

<div id="ref-zhang11">

\[120\] L. Zhang, Z. Chen, M. Zheng, and X. He, “Robust non-negative
matrix factorization,” *Frontiers of Electrical Electronic Engineering
China*, vol. 6, no. 2, pp. 192–200, Jun. 2011.

</div>

<div id="ref-jeong14">

\[121\] I.-Y. Jeong and K. Lee, “Vocal separation using extended robust
principal component analysis with Schatten \(P\)/\(L_p\)-norm and scale
compression,” in *International workshop on machine learning for signal
processing*, 2014.

</div>

<div id="ref-nie152">

\[122\] F. Nie, H. Wang, and H. Huang, “Joint Schatten \(p\)-norm and
\(l_p\)-norm robust matrix completion for missing value recovery,”
*Knowledge and Information Systems*, vol. 42, no. 3, pp. 525–544, Mar.
2015.

</div>

<div id="ref-yang13">

\[123\] Y.-H. Yang, “Low-rank representation of both singing voice and
music accompaniment via learned dictionaries,” in *14th international
society for music information retrieval conference*, 2013.

</div>

<div id="ref-mairal09">

\[124\] J. Mairal, F. Bach, J. Ponce, and G. Sapiro, “Online dictionary
learning for sparse coding,” in *26th annual international conference on
machine learning*, 2009.

</div>

<div id="ref-chan16">

\[125\] T.-S. T. Chan and Y.-H. Yang, “Complex and quaternionic
principal component pursuit and its application to audio separation,”
*IEEE Signal Processing Letters*, vol. 23, no. 2, pp. 287–291, Feb.
2016.

</div>

<div id="ref-peeters03">

\[126\] G. Peeters, “Deriving musical structures from signal analysis
for music audio summary generation: "Sequence" and "state" approach,” in
*International symposium on computer music multidisciplinary research*,
2003.

</div>

<div id="ref-dannenberg08">

\[127\] R. B. Dannenberg and M. Goto, “Music structure analysis from
acoustic signals,” in *Handbook of signal processing in acoustics*,
Springer New York, 2008, pp. 305–331.

</div>

<div id="ref-paulus10">

\[128\] J. Paulus, M. Müller, and A. Klapuri, “Audio-based music
structure analysis,” in *11th international society for music
information retrieval conference*, 2010.

</div>

<div id="ref-rafii11">

\[129\] Z. Rafii and B. Pardo, “A simple music/voice separation system
based on the extraction of the repeating musical structure,” in *IEEE
international conference on acoustics, speech and signal processing*,
2011.

</div>

<div id="ref-rafii13">

\[130\] Z. Rafii and B. Pardo, “REpeating Pattern Extraction Technique
(REPET): A simple method for music/voice separation,” *IEEE Transactions
on Audio, Speech, and Language Processing*, vol. 21, no. 1, pp. 73–84,
Jan. 2013.

</div>

<div id="ref-rafii14">

\[131\] Z. Rafii, A. Liutkus, and B. Pardo, “REPET for
background/foreground separation in audio,” in *Blind source
separation*, Springer Berlin Heidelberg, 2014, pp. 395–411.

</div>

<div id="ref-foote01">

\[132\] J. Foote and S. Uchihashi, “The beat spectrum: A new approach to
rhythm analysis,” in *IEEE international conference on multimedia and
expo*, 2001.

</div>

<div id="ref-seetharaman17">

\[133\] P. Seetharaman, F. Pishdadian, and B. Pardo, “Music/voice
separation using the 2D Fourier transform,” in *IEEE workshop on
applications of signal processing to audio and acoustics*, 2017.

</div>

<div id="ref-liutkus12">

\[134\] A. Liutkus, Z. Rafii, R. Badeau, B. Pardo, and G. Richard,
“Adaptive filtering for music/voice separation exploiting the
repeating musical structure,” in *IEEE international conference on
acoustics, speech and signal processing*, 2012.

</div>

<div id="ref-rafii12">

\[135\] Z. Rafii and B. Pardo, “Music/voice separation using the
similarity matrix,” in *13th international society for music information
retrieval conference*, 2012.

</div>

<div id="ref-foote99">

\[136\] J. Foote, “Visualizing music and audio using self-similarity,”
in *7th acm international conference on multimedia*, 1999.

</div>

<div id="ref-rafii133">

\[137\] Z. Rafii and B. Pardo, “Online REPET-SIM for real-time speech
enhancement,” in *IEEE international conference on acoustics, speech and
signal processing*, 2013.

</div>

<div id="ref-rafii15">

\[138\] Z. Rafii, A. Liutkus, and B. Pardo, “A simple user interface
system for recovering patterns repeating in time and frequency in
mixtures of sounds,” in *IEEE international conference on acoustics,
speech and signal processing*, 2015.

</div>

<div id="ref-fitzgerald12">

\[139\] D. FitzGerald, “Vocal separation using nearest neighbours and
median filtering,” in *23rd iet irish signals and systems conference*,
2012.

</div>

<div id="ref-liutkus14">

\[140\] A. Liutkus, Z. Rafii, B. Pardo, D. FitzGerald, and L. Daudet,
“Kernel spectrogram models for source separation,” in *4th joint
workshop on hands-free speech communication microphone arrays*, 2014.

</div>

<div id="ref-liutkus142">

\[141\] A. Liutkus, D. FitzGerald, Z. Rafii, B. Pardo, and L. Daudet,
“Kernel additive models for source separation,” *IEEE Transactions on
Signal Processing*, vol. 62, no. 16, pp. 4298–4310, Aug. 2014.

</div>

<div id="ref-liutkus15">

\[142\] A. Liutkus, D. FitzGerald, and Z. Rafii, “Scalable audio
separation with light kernel additive modelling,” in *IEEE international
conference on acoustics, speech and signal processing*, 2015.

</div>

<div id="ref-pratzlich15">

\[143\] T. Prätzlich, R. Bittner, A. Liutkus, and M. Müller, “Kernel
additive modeling for interference reduction in multi-channel music
recordings,” in *IEEE international conference on acoustics, speech and
signal processing*, 2015.

</div>

<div id="ref-fanoyela17">

\[144\] D. F. Yela, S. Ewert, D. FitzGerald, and M. Sandler,
“Interference reduction in music recordings combining kernel additive
modelling and non-negative matrix factorization,” in *IEEE international
conference on acoustics, speech and signal processing*, 2017.

</div>

<div id="ref-moussallam12">

\[145\] M. Moussallam, G. Richard, and L. Daudet, “Audio source
separation informed by redundancy with greedy multiscale
decompositions,” in *20th european signal processing conference*,
2012.

</div>

<div id="ref-mallat93">

\[146\] S. G. Mallat and Z. Zhang, “Matching pursuits with
time-frequency dictionaries,” *IEEE Transactions on Signal Processing*,
vol. 41, no. 12, pp. 3397–3415, Dec. 1993.

</div>

<div id="ref-deif152">

\[147\] H. Deif, D. FitzGerald, W. Wang, and L. Gan, “Separation of
vocals from monaural music recordings using diagonal median filters and
practical time-frequency parameters,” in *IEEE international symposium
on signal processing and information technology*, 2015.

</div>

<div id="ref-fitzgerald102">

\[148\] D. FitzGerald and M. Gainza, “Single channel vocal separation
using median filtering and factorisation techniques,” *ISAST
Transactions on Electronic and Signal Processing*, vol. 4, no. 1, pp.
62–73, Jan. 2010.

</div>

<div id="ref-lee152">

\[149\] J.-Y. Lee and H.-G. Kim, “Music and voice separation using
log-spectral amplitude estimator based on kernel spectrogram models
backfitting,” *Journal of the Acoustical Society of Korea*, vol. 34, no.
3, pp. 227–233, 2015.

</div>

<div id="ref-lee15">

\[150\] J.-Y. Lee, H.-S. Cho, and H.-G. Kim, “Vocal separation from
monaural music using adaptive auditory filtering based on kernel
back-fitting,” in *Interspeech*, 2015.

</div>

<div id="ref-cho15">

\[151\] H.-S. Cho, J.-Y. Lee, and H.-G. Kim, “Singing voice separation
from monaural music based on kernel back-fitting using beta-order
spectral amplitude estimation,” in *16th international society for music
information retrieval conference*, 2015.

</div>

<div id="ref-kim16">

\[152\] H.-G. Kim and J. Y. Kim, “Music/voice separation based on kernel
back-fitting using weighted \(\beta\)-order MMSE estimation,” *ETRI
Journal*, vol. 38, no. 3, pp. 510–517, Jun. 2016.

</div>

<div id="ref-plourde08">

\[153\] E. Plourde and B. Champagne, “Auditory-based spectral amplitude
estimators for speech enhancement,” *IEEE Transactions on Audio, Speech,
and Language Processing*, vol. 16, no. 8, pp. 1614–1623, Nov. 2008.

</div>

<div id="ref-raj07">

\[154\] B. Raj, P. Smaragdis, M. Shashanka, and R. Singh, “Separating a
foreground singer from background music,” in *International symposium on
frontiers of research on speech and music*, 2007.

</div>

<div id="ref-smaragdis06">

\[155\] P. Smaragdis and B. Raj, “Shift-invariant probabilistic latent
component analysis,” MERL, 2006.

</div>

<div id="ref-raj05">

\[156\] B. Raj and P. Smaragdis, “Latent variable decomposition of
spectrograms for single channel speaker separation,” in *IEEE workshop
on applications of signal processing to audio and acoustics*, 2005.

</div>

<div id="ref-han11">

\[157\] J. Han and C.-W. Chen, “Improving melody extraction using
probabilistic latent component analysis,” in *IEEE international
conference on acoustics, speech and signal processing*, 2011.

</div>

<div id="ref-boersma93">

\[158\] P. Boersma, “Accurate short-term analysis of the fundamental
frequency and the harmonics-to-noise ratio of a sampled sound,” in *IFA
proceedings 17*, 1993.

</div>

<div id="ref-gomez12">

\[159\] E. Gómez, F. J. C. Quesada, J. Salamon, J. Bonada, P. V. Candea,
and P. C. Molero, “Predominant fundamental frequency estimation vs
singing voice separation for the automatic transcription of accompanied
flamenco singing,” in *13th international society for music information
retrieval conference*, 2012.

</div>

<div id="ref-ono08">

\[160\] N. Ono, K. Miyamoto, J. L. Roux, H. Kameoka, and S. Sagayama,
“Separation of a monaural audio signal into harmonic/percussive
components by complementary diffusion on spectrogram,” in *16th european
signal processing conference*, 2008.

</div>

<div id="ref-papadopoulos14">

\[161\] H. Papadopoulos and D. P. Ellis, “Music-content-adaptive robust
principal component analysis for a semantically consistent separation of
foreground and background in music audio signals,” in *17th
international conference on digital audio effects*, 2014.

</div>

<div id="ref-chan15">

\[162\] T.-S. Chan *et al.*, “Vocal activity informed singing voice
separation with the iKala dataset,” in *IEEE international conference on
acoustics, speech and signal processing*, 2015.

</div>

<div id="ref-jeong17">

\[163\] I.-Y. Jeong and K. Lee, “Singing voice separation using RPCA
with weighted \(l_1\)-norm,” in *13th international conference on latent
variable analysis and signal separation*, 2017.

</div>

<div id="ref-virtanen08">

\[164\] T. Virtanen, A. Mesaros, and M. Ryynänen, “Combining pitch-based
inference and non-negative spectrogram factorization in separating
vocals from polyphonic music,” in *ISCA tutorial and research workshop
on statistical and perceptual audition*, 2008.

</div>

<div id="ref-wang11">

\[165\] Y. Wang and Z. Ou, “Combining HMM-based melody extraction and
NMF-based soft masking for separating voice and accompaniment from
monaural audio,” in *IEEE international conference on acoustics, speech
and signal processing*, 2011.

</div>

<div id="ref-klapuri06">

\[166\] A. Klapuri, “Multiple fundamental frequency estimation by
summing harmonic amplitudes,” in *7th international conference on music
information retrieval*, 2006.

</div>

<div id="ref-hsu09">

\[167\] C.-L. Hsu, L.-Y. Chen, J.-S. R. Jang, and H.-J. Li, “Singing
pitch extraction from monaural polyphonic songs by contextual audio
modeling and singing harmonic enhancement,” in *10th international
society for music information retrieval conference*, 2009.

</div>

<div id="ref-rafii142">

\[168\] Z. Rafii, Z. Duan, and B. Pardo, “Combining rhythm-based and
pitch-based methods for background and melody separation,” *IEEE/ACM
Transactions on Audio, Speech, and Language Processing*, vol. 22, no.
12, pp. 1884–1893, Sep. 2014.

</div>

<div id="ref-duan10">

\[169\] Z. Duan and B. Pardo, “Multiple fundamental frequency estimation
by modeling spectral peaks and non-peak regions,” *IEEE Transactions on
Audio, Speech, and Language Processing*, vol. 18, no. 8, pp. 2121–2133,
Nov. 2010.

</div>

<div id="ref-venkataramani14">

\[170\] S. Venkataramani, N. Nayak, P. Rao, and R. Velmurugan, “Vocal
separation using singer-vowel priors obtained from polyphonic audio,” in
*15th international society for music information retrieval conference*,
2014.

</div>

<div id="ref-rao10">

\[171\] V. Rao and P. Rao, “Vocal melody extraction in the presence of
pitched accompaniment in polyphonic music,” *IEEE Transactions on Audio,
Speech, and Language Processing*, vol. 18, no. 8, pp. 2145–2154, Nov.
2010.

</div>

<div id="ref-rao11">

\[172\] V. Rao, C. Gupta, and P. Rao, “Context-aware features for
singing voice detection in polyphonic music,” in *International workshop
on adaptive multimedia retrieval*, 2011.

</div>

<div id="ref-kim112">

\[173\] M. Kim, J. Yoo, K. Kang, and S. Choi, “Nonnegative matrix
partial co-factorization for spectral and temporal drum source
separation,” *IEEE Journal of Selected Topics in Signal Processing*,
vol. 5, no. 6, pp. 1192–1204, Oct. 2011.

</div>

<div id="ref-zhou14">

\[174\] L. Zhang, Z. Chen, M. Zheng, and X. He, “Nonnegative matrix and
tensor factorizations: An algorithmic perspective,” *IEEE Signal
Processing Magazine*, vol. 31, no. 3, pp. 54–65, May 2014.

</div>

<div id="ref-ikemiya15">

\[175\] Y. Ikemiya, K. Yoshii, and K. Itoyama, “Singing voice analysis
and editing based on mutually dependent F0 estimation and source
separation,” in *IEEE international conference on acoustics, speech and
signal processing*, 2015.

</div>

<div id="ref-ikemiya16">

\[176\] Y. Ikemiya, K. Itoyama, and K. Yoshii, “Singing voice separation
and vocal F0 estimation based on mutual combination of robust principal
component analysis and subharmonic summation,” *IEEE/ACM Transactions on
Audio, Speech, and Language Processing*, vol. 24, no. 11, pp. 2084–2095,
Nov. 2016.

</div>

<div id="ref-hermes88">

\[177\] D. J. Hermes, “Measurement of pitch by subharmonic summation,”
*Journal of the Acoustical Society of America*, vol. 83, no. 1, pp.
257–264, Jan. 1988.

</div>

<div id="ref-dobashi15">

\[178\] A. Dobashi, Y. Ikemiya, K. Itoyama, and K. Yoshii, “A music
performance assistance system based on vocal, harmonic, and percussive
source separation and content visualization for music audio signals,” in
*12th sound and music computing conference*, 2015.

</div>

<div id="ref-hu15">

\[179\] Y. Hu and G. Liu, “Separation of singing voice using nonnegative
matrix partial co-factorization for singer identification,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 23, no. 4,
pp. 643–653, Apr. 2015.

</div>

<div id="ref-yoo10">

\[180\] J. Yoo, M. Kim, K. Kang, and S. Choi, “Nonnegative matrix
partial co-factorization for drum source separation,” in *IEEE
international conference on acoustics, speech and signal processing*,
2010.

</div>

<div id="ref-boersma01">

\[181\] P. Boersma, “PRAAT, a system for doing phonetics by computer,”
*Glot International*, vol. 5, no. 9/10, pp. 341–347, Dec. 2001.

</div>

<div id="ref-li09">

\[182\] Y. Li, J. Woodruff, and D. Wang, “Monaural musical sound
separation based on pitch and common amplitude modulation,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 17, no. 7,
pp. 1361–1371, Sep. 2009.

</div>

<div id="ref-raj04">

\[183\] B. Raj, M. L. Seltzer, and R. M. Stern, “Reconstruction of
missing features for robust speech recognition,” *Speech Communication*,
vol. 43, no. 4, pp. 275–296, Sep. 2004.

</div>

<div id="ref-hu16">

\[184\] Y. Hu and G. Liu, “Monaural singing voice separation by
non-negative matrix partial co-factorization with temporal continuity
and sparsity criteria,” in *12th international conference on intelligent
computing*, 2016.

</div>

<div id="ref-zhang15">

\[185\] X. Zhang, W. Li, and B. Zhu, “Latent time-frequency component
analysis: A novel pitch-based approach for singing voice separation,” in
*IEEE international conference on acoustics, speech and signal
processing*, 2015.

</div>

<div id="ref-decheveigne02">

\[186\] A. de Cheveigné and H. Kawahara, “YIN, a fundamental frequency
estimator for speech and music,” *Journal of the Acoustical Society of
America*, vol. 111, no. 4, pp. 1917–1930, Apr. 2002.

</div>

<div id="ref-zhu15">

\[187\] B. Zhu, W. Li, and L. Li, “Towards solving the bottleneck of
pitch-based singing voice separation,” in *23rd acm international
conference on multimedia*, 2015.

</div>

<div id="ref-durrieu08">

\[188\] J.-L. Durrieu, G. Richard, and B. David, “Singer melody
extraction in polyphonic signals using source separation methods,” in
*IEEE international conference on acoustics, speech and signal
processing*, 2008.

</div>

<div id="ref-durrieu09">

\[189\] J.-L. Durrieu, G. Richard, and B. David, “An iterative approach
to monaural musical mixture de-soloing,” in *IEEE international
conference on acoustics, speech and signal processing*, 2009.

</div>

<div id="ref-durrieu10">

\[190\] J.-L. Durrieu, G. Richard, B. David, and C. Févotte,
“Source/filter model for unsupervised main melody extraction from
polyphonic audio signals,” *IEEE Transactions on Audio, Speech, and
Language Processing*, vol. 18, no. 3, pp. 564–575, Mar. 2010.

</div>

<div id="ref-ozerov07">

\[191\] A. Ozerov, P. Philippe, F. Bimbot, and R. Gribonval, “Adaptation
of Bayesian models for single-channel source separation and its
application to voice/music separation in popular songs,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 15, no. 5,
pp. 1564–1578, Jul. 2007.

</div>

<div id="ref-klatt90">

\[192\] D. H. Klatt and L. C. Klatt, “Analysis, synthesis, and
perception of voice quality variations among female and male talkers,”
*Journal of the Acoustical Society of America*, vol. 87, no. 2, pp.
820–857, Feb. 1990.

</div>

<div id="ref-benaroya032">

\[193\] L. Benaroya, L. Mcdonagh, F. Bimbot, and R. Gribonval, “Non
negative sparse representation for Wiener based source separation with a
single sensor,” in *IEEE international conference on acoustics, speech
and signal processing*, 2003.

</div>

<div id="ref-dhillon05">

\[194\] I. S. Dhillon and S. Sra, “Generalized nonnegative matrix
approximations with Bregman divergences,” in *Advances in neural
information processing systems 18*, MIT Press, 2005, pp. 283–290.

</div>

<div id="ref-benaroya06">

\[195\] L. Benaroya, F. Bimbot, and R. Gribonval, “Audio source
separation with a single sensor,” *IEEE Transactions on Audio, Speech,
and Language Processing*, vol. 14, no. 1, pp. 191–199, Jan. 2006.

</div>

<div id="ref-durrieu12">

\[196\] J.-L. Durrieu and J.-P. Thiran, “Musical audio source separation
based on user-selected F0 track,” in *10th international conference on
latent variable analysis and signal separation*, 2012.

</div>

<div id="ref-fuentes2012">

\[197\] B. Fuentes, R. Badeau, and G. Richard, “Blind harmonic adaptive
decomposition applied to supervised source separation,” in *Signal
processing conference (eusipco), 2012 proceedings of the 20th european*,
2012, pp. 2654–2658.

</div>

<div id="ref-brown91">

\[198\] J. C. Brown, “Calculation of a constant Q spectral transform,”
*Journal of the Acoustical Society of America*, vol. 89, no. 1, pp.
425–434, Jan. 1991.

</div>

<div id="ref-brown92">

\[199\] J. C. Brown and M. S. Puckette, “An efficient algorithm for the
calculation of a constant Q transform,” *Journal of the Acoustical
Society of America*, vol. 92, no. 5, pp. 2698–2701, Nov. 1992.

</div>

<div id="ref-schorkhuber10">

\[200\] C. Schörkhuber and A. Klapuri, “Constant-Q transform toolbox,”
in *7th sound and music computing conference*, 2010.

</div>

<div id="ref-durrieu11">

\[201\] J.-L. Durrieu, B. David, and G. Richard, “A musically motivated
mid-level representation for pitch estimation and musical audio source
separation,” *IEEE Journal of Selected Topics in Signal Processing*,
vol. 5, no. 6, pp. 1180–1191, Oct. 2011.

</div>

<div id="ref-joder12">

\[202\] C. Joder and B. Schuller, “Score-informed leading voice
separation from monaural audio,” in *13th international society for
music information retrieval conference*, 2012.

</div>

<div id="ref-joder11">

\[203\] C. Joder, S. Essid, and G. Richard, “A conditional random field
framework for robust and scalable audio-to-score matching,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 19, no. 8,
pp. 2385–2397, Nov. 2011.

</div>

<div id="ref-zhao14">

\[204\] R. Zhao, S. Lee, D.-Y. Huang, and M. Dong, “Soft constrained
leading voice separation with music score guidance,” in *9th
international symposium on chinese spoken language*, 2014.

</div>

<div id="ref-durrieu092">

\[205\] J.-L. Durrieu, A. Ozerov, C. Févotte, G. Richard, and B. David,
“Main instrument separation from stereophonic audio signals using a
source/filter model,” in *17th european signal processing conference*,
2009.

</div>

<div id="ref-janer13">

\[206\] J. Janer and R. Marxer, “Separation of unvoiced fricatives in
singing voice mixtures with semi-supervised NMF,” in *16th international
conference on digital audio effects*, 2013.

</div>

<div id="ref-janer12">

\[207\] J. Janer, R. Marxer, and K. Arimoto, “Combining a harmonic-based
NMF decomposition with transient analysis for instantaneous percussion
separation,” in *IEEE international conference on acoustics, speech and
signal processing*, 2012.

</div>

<div id="ref-marxer13">

\[208\] R. Marxer and J. Janer, “Modelling and separation of singing
voice breathiness in polyphonic mixtures,” in *16th international
conference on digital audio effects*, 2013.

</div>

<div id="ref-degottex11">

\[209\] G. Degottex, A. Roebel, and X. Rodet, “Pitch transposition and
breathiness modification using a glottal source model and its adapted
vocal-tract filter,” in *IEEE international conference on acoustics,
speech and signal processing*, 2011.

</div>

<div id="ref-ozerov102">

\[210\] A. Ozerov, E. Vincent, and F. Bimbot, “A general modular
framework for audio source separation,” in *9th international conference
on latent variable analysis and signal separation*, 2010.

</div>

<div id="ref-ozerov12">

\[211\] A. Ozerov, E. Vincent, and F. Bimbot, “A general flexible
framework for the handling of prior information in audio source
separation,” *IEEE Transactions on Audio, Speech, and Language
Processing*, vol. 20, no. 4, pp. 1118–1133, May 2012.

</div>

<div id="ref-salaun14">

\[212\] Y. Salaün *et al.*, “The flexible audio source separation
toolbox version 2.0,” in *IEEE international conference on acoustics,
speech and signal processing*, 2014.

</div>

<div id="ref-hennequin16">

\[213\] R. Hennequin and F. Rigaud, “Long-term reverberation modeling
for under-determined audio source separation with application to vocal
melody extraction,” in *17th international society for music information
retrieval conference*, 2016.

</div>

<div id="ref-singh10">

\[214\] R. Singh, B. Raj, and P. Smaragdis, “Latent-variable
decomposition based dereverberation of monaural and multi-channel
signals,” in *IEEE international conference on acoustics, speech and
signal processing*, 2010.

</div>

<div id="ref-ono082">

\[215\] N. Ono, K. Miyamoto, H. Kameoka, and S. Sagayama, “A real-time
equalizer of harmonic and percussive components in music signals,” in
*9th international conference on music information retrieval*, 2008.

</div>

<div id="ref-fitzgerald10">

\[216\] D. FitzGerald, “Harmonic/percussive separation using median
filtering,” in *13th international conference on digital audio effects*,
2010.

</div>

<div id="ref-yang12">

\[217\] Y.-H. Yang, “On sparse and low-rank matrix decomposition for
singing voice separation,” in *20th acm international conference on
multimedia*, 2012.

</div>

<div id="ref-jeong142">

\[218\] I.-Y. Jeong and K. Lee, “Vocal separation from monaural music
using temporal/spectral continuity and sparsity constraints,” *IEEE
Signal Processing Letters*, vol. 21, no. 10, pp. 1197–1200, Jun. 2014.

</div>

<div id="ref-ochiai15">

\[219\] E. Ochiai, T. Fujisawa, and M. Ikehara, “Vocal separation by
constrained non-negative matrix factorization,” in *Asia-pacific signal
and information processing association annual summit and conference*,
2015.

</div>

<div id="ref-watanabe16">

\[220\] T. Watanabe, T. Fujisawa, and M. Ikehara, “Vocal separation
using improved robust principal component analysis and post-processing,”
in *IEEE 59th international midwest symposium on circuits and systems*,
2016.

</div>

<div id="ref-raguet13">

\[221\] H. Raguet, J. Fadili, and and Gabriel Peyré, “A generalized
forward-backward splitting,” *SIAM Journal on Imaging Sciences*, vol. 6,
no. 3, pp. 1199–1226, Jul. 2013.

</div>

<div id="ref-hayashi16">

\[222\] A. Hayashi, H. Kameoka, T. Matsubayashi, and H. Sawada,
“Non-negative periodic component analysis for music source
separation,” in *Asia-pacific signal and information processing
association annual summit and conference*, 2016.

</div>

<div id="ref-fitzgerald09">

\[223\] D. FitzGerald, M. Cranitch, and E. Coyle, “Using tensor
factorisation models to separate drums from polyphonic music,” in *12th
international conference on digital audio effects*, 2009.

</div>

<div id="ref-tachibana14">

\[224\] H. Tachibana, N. Ono, and S. Sagayama, “Singing voice
enhancement in monaural music signals based on two-stage
harmonic/percussive sound separation on multiple resolution
spectrograms,” *IEEE/ACM Transactions on Audio, Speech and Language
Processing*, vol. 22, no. 1, pp. 228–237, Jan. 2014.

</div>

<div id="ref-tachibana10">

\[225\] H. Tachibana, T. Ono, N. Ono, and S. Sagayama, “Melody line
estimation in homophonic music audio signals based on
temporal-variability of melodic source,” in *IEEE international
conference on acoustics, speech and signal processing*, 2010.

</div>

<div id="ref-tachibana16">

\[226\] H. Tachibana, N. Ono, and S. Sagayama, “A real-time
audio-to-audio karaoke generation system for monaural recordings based
on singing voice suppression and key conversion techniques,” *Journal of
Information Processing*, vol. 24, no. 3, pp. 470–482, May 2016.

</div>

<div id="ref-ono10">

\[227\] N. Ono *et al.*, “Harmonic and percussive sound separation and
its application to MIR-related tasks,” in *Advances in music information
retrieval*, Springer Berlin Heidelberg, 2010, pp. 213–236.

</div>

<div id="ref-tachibana12">

\[228\] H. Tachibana, H. Kameoka, N. Ono, and S. Sagayama, “Comparative
evaluations of multiple harmonic/percussive sound separation techniques
based on anisotropic smoothness of spectrogram,” in *IEEE international
conference on acoustics, speech and signal processing*, 2012.

</div>

<div id="ref-deif15">

\[229\] H. Deif, W. Wang, L. Gan, and S. Alhashmi, “A local
discontinuity based approach for monaural singing voice separation from
accompanying music with multi-stage non-negative matrix factorization,”
in *IEEE global conference on signal and information processing*, 2015.

</div>

<div id="ref-zhu13">

\[230\] B. Zhu, W. Li, R. Li, and X. Xue, “Multi-stage non-negative
matrix factorization for monaural singing voice separation,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 21, no.
10, pp. 2096–2107, Oct. 2013.

</div>

<div id="ref-driedger15">

\[231\] J. Driedger and M. Müller, “Extracting singing voice from music
recordings by cascading audio decomposition techniques,” in *IEEE
international conference on acoustics, speech and signal processing*,
2015.

</div>

<div id="ref-driedger14">

\[232\] J. Driedger, M. Müller, and S. Disch, “Extending
harmonic-percussive separation of audio signals,” in *15th international
society for music information retrieval conference*, 2014.

</div>

<div id="ref-talmon11">

\[233\] R. Talmon, I. Cohen, and S. Gannot, “Transient noise reduction
using nonlocal diffusion filters,” *IEEE/ACM Transactions on Audio,
Speech and Language Processing*, vol. 19, no. 6, pp. 1584–1599, Aug.
2011.

</div>

<div id="ref-hsu12">

\[234\] C.-L. Hsu, D. Wang, J.-S. R. Jang, and K. Hu, “A tandem
algorithm for singing pitch extraction and voice separation from music
accompaniment,” *IEEE Transactions on Audio, Speech, and Language
Processing*, vol. 20, no. 5, pp. 1482–1491, Jul. 2012.

</div>

<div id="ref-hu10">

\[235\] G. Hu and D. Wang, “A tandem algorithm for pitch estimation and
voiced speech segregation,” *IEEE Transactions on Audio, Speech, and
Language Processing*, vol. 18, no. 8, pp. 2067–2079, Nov. 2010.

</div>

<div id="ref-rumelhart86">

\[236\] D. E. Rumelhart, G. E. Hinton, and R. J. Williams, “Learning
internal representations by error propagation,” in *Parallel distributed
processing: Explorations in the microstructure of cognition, vol. 1*,
MIT Press Cambridge, 1986, pp. 318–362.

</div>

<div id="ref-bryan13">

\[237\] N. J. Bryan and G. J. Mysore, “Interactive user-feedback for
sound source separation,” in *International conference on intelligent
user-interfaces, workshop on interactive machine learning*, 2013.

</div>

<div id="ref-bryan132">

\[238\] N. J. Bryan and G. J. Mysore, “An efficient posterior
regularized latent variable model for interactive sound source
separation,” in *30th international conference on machine learning*,
2013.

</div>

<div id="ref-bryan133">

\[239\] N. J. Bryan and G. J. Mysore, “Interactive refinement of
supervised and semi-supervised sound source separation estimates,” in
*IEEE international conference on acoustics, speech, and signal
processing*, 2013.

</div>

<div id="ref-ganchev10">

\[240\] K. Ganchev, J. Graça, J. Gillenwater, and B. Taskar, “Posterior
regularization for structured latent variable models,” *Journal of
Machine Learning Research*, vol. 11, pp. 2001–2049, Mar. 2010.

</div>

<div id="ref-ozerov13">

\[241\] A. Ozerov, N. Duong, and L. Chevallier, “Weighted nonnegative
tensor factorization: On monotonicity of multiplicative update rules and
application to user-guided audio source separation,” Technicolor, 2013.

</div>

<div id="ref-jaureguiberry13">

\[242\] X. Jaureguiberry, G. Richard, P. Leveau, R. Hennequin, and E.
Vincent, “Introducing a simple fusion framework for audio source
separation,” in *IEEE international workshop on machine learning for
signal processing*, 2013.

</div>

<div id="ref-jaureguiberry14">

\[243\] X. Jaureguiberry, E. Vincent, and G. Richard, “Variational
Bayesian model averaging for audio source separation,” in *IEEE workshop
on statistical signal processing workshop*, 2014.

</div>

<div id="ref-jaureguiberry16">

\[244\] X. Jaureguiberry, E. Vincent, and G. Richard, “Fusion methods
for speech enhancement and audio source separation,” *IEEE/ACM
Transactions on Audio, Speech, and Language Processing*, vol. 24, no. 7,
pp. 1266–1279, Jul. 2016.

</div>

<div id="ref-hoeting99">

\[245\] J. A. Hoeting, D. Madigan, A. E. Raftery, and C. T. Volinsky,
“Bayesian model averaging: A tutorial,” *Statistical Science*, vol.
14, no. 4, pp. 382–417, Nov. 1999.

</div>

<div id="ref-mcvicar16">

\[246\] M. McVicar, R. Santos-Rodriguez, and T. D. Bie, “Learning to
separate vocals from polyphonic mixtures via ensemble methods and
structured output prediction,” in *IEEE international conference on
acoustics, speech and signal processing*, 2016.

</div>

<div id="ref-jain90">

\[247\] A. K. Jain and F. Farrokhnia, “Unsupervised texture segmentation
using Gabor filters,” in *IEEE international conference on systems, man
and cybernetics*, 1990.

</div>

<div id="ref-huang14">

\[248\] P.-S. Huang, M. Kim, M. Hasegawa-Johnson, and P. Smaragdis,
“Singing-voice separation from monaural recordings using deep
recurrent neural networks,” in *15th international society for music
information retrieval conference*, 2014.

</div>

<div id="ref-lacoste-julien13">

\[249\] S. Lacoste-Julien, M. Jaggi, M. Schmidt, and P. Pletscher,
“Block-coordinate Frank-Wolfe optimization for structural SVMs,” in
*30th international conference on machine learning*, 2013.

</div>

<div id="ref-manilow17">

\[250\] E. Manilow, P. Seetharaman, F. Pishdadian, and B. Pardo,
“Predicting algorithm efficacy for adaptive, multi-cue source
separation,” in *IEEE workshop on applications of signal processing to
audio and acoustics*, 2017.

</div>

<div id="ref-wolf14">

\[251\] G. Wolf, S. Mallat, and S. Shamma, “Audio source separation with
time-frequency velocities,” in *IEEE international workshop on machine
learning for signal processing*, 2014.

</div>

<div id="ref-wolf16">

\[252\] G. Wolf, S. Mallat, and S. Shamma, “Rigid motion model for audio
source separation,” *IEEE Transactions on Signal Processing*, vol. 64,
no. 7, pp. 1822–1831, Apr. 2016.

</div>

<div id="ref-anden14">

\[253\] J. Andén and S. Mallat, “Deep scattering spectrum,” *IEEE
Transactions on Signal Processing*, vol. 62, no. 16, pp. 4114–4128, Aug.
2014.

</div>

<div id="ref-bernard01">

\[254\] C. P. Bernard, “Discrete wavelet analysis for fast optic flow
computation,” *Applied and Computational Harmonic Analysis*, vol. 11,
no. 1, pp. 32–63, Jul. 2001.

</div>

<div id="ref-yen14">

\[255\] F. Yen, Y.-J. Luo, and T.-S. Chi, “Singing voice separation
using spectro-temporal modulation features,” in *15th international
society for music information retrieval conference*, 2014.

</div>

<div id="ref-yen15">

\[256\] F. Yen, M.-C. Huang, and T.-S. Chi, “A two-stage singing voice
separation algorithm using spectro-temporal modulation features,” in
*Interspeech*, 2015.

</div>

<div id="ref-chi05">

\[257\] T. Chi, P. Rub, and S. A. Shamma, “Multiresolution
spectrotemporal analysis of complex sounds,” *Journal of the Acoustical
Society of America*, vol. 118, no. 2, pp. 887–906, Aug. 2005.

</div>

<div id="ref-chi99">

\[258\] T. Chi, Y. Gao, M. C. Guyton, P. Ru, and S. Shamma,
“Spectro-temporal modulation transfer functions and speech
intelligibility,” *Journal of the Acoustical Society of America*, vol.
106, no. 5, pp. 2719–2732, Nov. 1999.

</div>

<div id="ref-chan17">

\[259\] T.-S. T. Chan and Y.-H. Yang, “Informed group-sparse
representation for singing voice separation,” *IEEE Signal Processing
Letters*, vol. 24, no. 2, pp. 156–160, Feb. 2017.

</div>

<div id="ref-yuan06">

\[260\] M. Yuan and Y. Lin, “Model selection and estimation in
regression with grouped variables,” *Journal of the Royal Statistical
Society Series B*, vol. 68, no. 1, pp. 49–67, Dec. 2006.

</div>

<div id="ref-ma16">

\[261\] S. Ma, “Alternating proximal gradient method for convex
minimization,” *Journal of Scientific Computing*, vol. 68, no. 2, pp.
546–572, Aug. 2016.

</div>

<div id="ref-liu13">

\[262\] G. Liu, Z. Lin, S. Yan, J. Sun, Y. Yu, and Y. Ma, “Robust
recovery of subspace structures by low-rank representation,” *IEEE
Transactions on Pattern Analysis and Machine Intelligence*, vol. 35, no.
1, pp. 171–184, Jan. 2007.

</div>

<div id="ref-varga93">

\[263\] A. Varga and H. J. Steeneken, “Assessment for automatic speech
recognition: II. NOISEX-92: A database and an experiment to study the
effect of additive noise on speech recognition systems,” *Speech
Communication*, vol. 12, no. 3, pp. 247–251, Jul. 1993.

</div>

<div id="ref-garofolo93">

\[264\] J. S. Garofolo, L. F. Lamel, W. M. Fisher, J. G. Fiscus, and D.
S. Pallett, “DARPA TIMIT acoustic-phonetic continuous speech corpus
CD-ROM. NIST speech disc 1-1.1,” *NASA STI/Recon technical report n*.
1993.

</div>

<div id="ref-sturmel12">

\[265\] N. Sturmel *et al.*, “Linear mixing models for active listening
of music productions in realistic studio conditions,” in *132nd aes
convention*, 2012.

</div>

<div id="ref-MTGMASSdb">

\[266\] M. Vinyes, “MTG MASS database.” 2008.

</div>

<div id="ref-vincent09">

\[267\] E. Vincent, S. Araki, and P. Bofill, “The 2008 signal separation
evaluation campaign: A community-based approach to large-scale
evaluation,” in *8th international conference on independent component
analysis and signal separation*, 2009.

</div>

<div id="ref-araki10">

\[268\] S. Araki *et al.*, “The 2010 signal separation evaluation
campaign (SiSEC2010): - audio source separation -,” in *9th
international conference on latent variable analysis and signal
separation*, 2010.

</div>

<div id="ref-araki12">

\[269\] S. Araki *et al.*, “The 2011 signal separation evaluation
campaign (SiSEC2011): - audio source separation -,” in *10th
international conference on latent variable analysis and signal
separation*, 2012.

</div>

<div id="ref-vincent12">

\[270\] E. Vincent *et al.*, “The signal separation evaluation campaign
(2007-2010): Achievements and remaining challenges,” *Signal
Processing*, vol. 92, no. 8, pp. 1928–1936, Aug. 2012.

</div>

<div id="ref-ono15">

\[271\] N. Ono, Z. Rafii, D. Kitamura, N. Ito, and A. Liutkus, “The 2015
signal separation evaluation campaign,” in *12th international
conference on latent variable analysis and signal separation*, 2015.

</div>

<div id="ref-liutkus17">

\[272\] A. Liutkus *et al.*, “The 2016 signal separation evaluation
campaign,” in *13th international conference on latent variable analysis
and signal separation*, 2017.

</div>

<div id="ref-liutkus11">

\[273\] A. Liutkus, R. Badeau, and G. Richard, “Gaussian processes for
underdetermined source separation,” *IEEE Transactions on Audio, Speech,
and Language Processing*, vol. 59, no. 7, pp. 3155–3167, Feb. 2011.

</div>

<div id="ref-bittner14">

\[274\] R. Bittner, J. Salamon, M. Tierney, M. Mauch, C. Cannam, and and
Juan P. Bello, “MedleyDB: A multitrack dataset for annotation-intensive
mir research,” in *15th international society for music information
retrieval conference*, 2014.

</div>

<div id="ref-rafii17">

\[275\] Z. Rafii, A. Liutkus, F.-R. Stöter, S. I. Mimilakis, and R.
Bittner, “MUSDB18, a dataset for audio source separation.” Dec-2017.

</div>

<div id="ref-ozerov05">

\[276\] A. Ozerov, P. Philippe, R. Gribonval, and F. Bimbot, “One
microphone singing voice separation using source-adapted models,” in
*IEEE workshop on applications of signal processing to audio and
acoustics*, 2005.

</div>

<div id="ref-tsai04">

\[277\] W.-H. Tsai, D. Rogers, and H.-M. Wang, “Blind clustering of
popular music recordings based on singer voice characteristics,”
*Computer Music Journal*, vol. 28, no. 3, pp. 68–78, 2004.

</div>

<div id="ref-gauvain94">

\[278\] J.-L. Gauvain and C.-H. Lee, “Maximum a posteriori estimation
for multivariate Gaussian mixture observations of Markov chains,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 2, no. 2,
pp. 291–298, Apr. 1994.

</div>

<div id="ref-vincent10">

\[279\] E. Vincent, M. Jafari, S. Abdallah, M. Plumbley, and M. Davies,
“Probabilistic modeling paradigms for audio source separation,” in
*Machine audition: Principles, algorithms and systems*, IGI Global,
2010, pp. 162–185.

</div>

<div id="ref-rafii132">

\[280\] Z. Rafii, D. L. Sun, F. G. Germain, and G. J. Mysore, “Combining
modeling of singing voice and background music for automatic separation
of musical mixtures,” in *14th international society for music
information retrieval conference*, 2013.

</div>

<div id="ref-boulanger-lewandowski14">

\[281\] N. Boulanger-Lewandowski, G. J. Mysore, and M. Hoffman,
“Exploiting long-term temporal dependencies in NMF using recurrent
neural networks with application to source separation,” in *IEEE
international conference on acoustics, speech and signal processing*,
2014.

</div>

<div id="ref-mysore10">

\[282\] G. J. Mysore, P. Smaragdis, and B. Raj, “Non-negative hidden
Markov modeling of audio with application to source separation,” in *9th
international conference on latent variable analysis and signal
separation*, 2010.

</div>

<div id="ref-qian17">

\[283\] K. Qian, Y. Zhang, S. Chang, X. Yang, D. Florêncio, and M.
Hasegawa-Johnson, “Speech enhancement using bayesian wavenet,” *Proc.
Interspeech 2017*, pp. 2013–2017, 2017.

</div>

<div id="ref-deng14">

\[284\] L. Deng and D. Yu, “Deep learning: Methods and applications,”
*Foundations and Trends in Signal Processing*, vol. 7, nos. 3-4, pp.
197–387, Jun. 2014.

</div>

<div id="ref-lecun15">

\[285\] Y. LeCun, Y. Bengio, and G. Hinton, “Deep learning,” *Nature*,
vol. 521, pp. 436–444, May 2015.

</div>

<div id="ref-goodfellow16">

\[286\] I. Goodfellow, Y. Bengio, and A. Courville, *Deep learning*. MIT
Press, 2016.

</div>

<div id="ref-robbins51">

\[287\] H. Robbins and S. Monro, “A stochastic approximation method,”
*Annals of Mathematical Statistics*, vol. 22, no. 3, pp. 400–407, Sep.
1951.

</div>

<div id="ref-rumelhart862">

\[288\] D. E. Rumelhart, G. E. Hinton, and R. J. Williams, “Learning
representations by back-propagating errors,” *Nature*, vol. 323, pp.
533–536, Oct. 1986.

</div>

<div id="ref-hermans13">

\[289\] M. Hermans and B. Schrauwen, “Training and analysing deep
recurrent neural networks,” in *26th international conference on neural
information processing systems*, 2013.

</div>

<div id="ref-pascanu14">

\[290\] R. Pascanu, C. Gulcehre, K. Cho, and Y. Bengio, “How to
construct deep recurrent neural networks,” in *International conference
on learning representations*, 2014.

</div>

<div id="ref-huang15">

\[291\] P.-S. Huang, M. Kim, M. Hasegawa-Johnson, and P. Smaragdis,
“Joint optimization of masks and deep recurrent neural networks for
monaural source separation,” *IEEE/ACM Transactions on Audio, Speech,
and Language Processing*, vol. 23, 2015.

</div>

<div id="ref-huang142">

\[292\] P.-S. Huang, M. Kim, M. Hasegawa-Johnson, and P. Smaragdis,
“Deep learning for monaural speech separation,” in *IEEE international
conference on acoustics, speech and signal processing*, 2014.

</div>

<div id="ref-uhlich15">

\[293\] S. Uhlich, F. Giron, and Y. Mitsufuji, “Deep neural network
based instrument extraction from music,” in *IEEE international
conference on acoustics, speech and signal processing*, 2015.

</div>

<div id="ref-uhlich17">

\[294\] S. Uhlich *et al.*, “Improving music source separation based on
deep neural networks through data augmentation and network blending,” in
*IEEE international conference on acoustics, speech and signal
processing*, 2017.

</div>

<div id="ref-simpson15">

\[295\] A. J. R. Simpson, G. Roma, and M. D. Plumbley, “Deep karaoke:
Extracting vocals from musical mixtures using a convolutional deep
neural network,” in *12th international conference on latent variable
analysis and signal separation*, 2015.

</div>

<div id="ref-schlueter16">

\[296\] J. Schlüter, “Learning to pinpoint singing voice from weakly
labeled examples,” in *17th international society for music information
retrieval conference*, 2016.

</div>

<div id="ref-chandna17">

\[297\] P. Chandna, M. Miron, J. Janer, and E. Gómez, “Monoaural audio
source separation using deep convolutional neural networks,” in *13th
international conference on latent variable analysis and signal
separation*, 2017.

</div>

<div id="ref-mimilakis16">

\[298\] S. I. Mimilakis, E. Cano, J. Abeßer, and G. Schuller, “New
sonorities for jazz recordings: Separation and mixing using deep neural
networks,” in *2nd aes workshop on intelligent music production*, 2016.

</div>

<div id="ref-mimilakis17">

\[299\] S. I. Mimilakis, K. Drossos, T. Virtanen, and G. Schuller, “A
recurrent encoder-decoder approach with skip-filtering connections for
monaural singing voice separation,” in *IEEE international workshop on
machine learning for signal processing*, 2017.

</div>

<div id="ref-mimilakis172">

\[300\] S. I. Mimilakis, K. Drossos, J. F. Santos, G. Schuller, T.
Virtanen, and Y. Bengio, “Monaural singing voice separation with
skip-filtering connections and recurrent inference of time-frequency
mask,” in *IEEE international conference on acoustics, speech and signal
processing*, 2018.

</div>

<div id="ref-jansson17">

\[301\] A. Jansson, E. Humphrey, N. Montecchio, R. Bittner, A. Kumar,
and T. Weyde, “Singing voice separation with deep U-Net convolutional
networks,” in *18th international society for music information
retrieval conferenceng*, 2017.

</div>

<div id="ref-takahashi17">

\[302\] N. Takahashi and Y. Mitsufuji, “Multi-scale multi-band densenets
for audio source separation,” in *IEEE workshop on applications of
signal processing to audio and acoustics*, 2017.

</div>

<div id="ref-hershey16">

\[303\] J. R. Hershey, Z. Chen, J. L. Roux, and S. Watanabe, “Deep
clustering: Discriminative embeddings for segmentation and separation,”
in *IEEE international conference on acoustics, speech and signal
processing*, 2016.

</div>

<div id="ref-isik16">

\[304\] Y. Isik, J. L. Roux, Z. Chen, S. Watanabe, and J. R. Hershey,
“Single-channel multispeaker separation using deep clustering,” in
*Interspeech*, 2016.

</div>

<div id="ref-luo17">

\[305\] Y. Luo, Z. Chen, J. R. Hershey, J. L. Roux, and N. Mesgarani,
“Deep clustering and conventional networks for music separation:
Stronger together,” in *IEEE international conference on acoustics,
speech and signal processing*, 2017.

</div>

<div id="ref-kim15">

\[306\] M. Kim and P. Smaragdis, “Adaptive denoising autoencoders: A
fine-tuning scheme to learn from test mixtures,” in *12th international
conference on latent variable analysis and signal separation*, 2015.

</div>

<div id="ref-vincentp10">

\[307\] P. Vincent, H. Larochelle, I. Lajoie, Y. Bengio, and P.-A.
Manzagol, “Stacked denoising autoencoders: Learning useful
representations in a deep network with a local denoising criterion,”
*Journal of Machine Learning Research*, vol. 11, pp. 3371–3408, Dec.
2010.

</div>

<div id="ref-grais16">

\[308\] E. M. Grais, G. Roma, A. J. R. Simpson, and M. D. Plumbley,
“Single channel audio source separation using deep neural network
ensembles,” in *140th aes convention*, 2016.

</div>

<div id="ref-grais162">

\[309\] E. M. Grais, G. Roma, A. J. R. Simpson, and M. D. Plumbley,
“Combining mask estimates for single channel audio source separation
using deep neural networks,” in *Interspeech*, 2016.

</div>

<div id="ref-grais17">

\[310\] E. M. Grais, G. Roma, A. J. R. Simpson, and M. D. Plumbley,
“Discriminative enhancement for single channel audio source separation
using deep neural networks,” in *13th international conference on latent
variable analysis and signal separation*, 2017.

</div>

<div id="ref-grais172">

\[311\] E. M. Grais, G. Roma, A. J. R. Simpson, and M. D. Plumbley,
“Two-stage single-channel audio source separation using deep neural
networks,” *IEEE/ACM Transactions on Audio, Speech, and Language
Processing*, vol. 25, no. 9, pp. 1773–1783, Sep. 2017.

</div>

<div id="ref-nie15">

\[312\] S. Nie *et al.*, “Joint optimization of recurrent networks
exploiting source auto-regression for source separation,” in
*Interspeech*, 2015.

</div>

<div id="ref-sebastian16">

\[313\] J. Sebastian and H. A. Murthy, “Group delay based music source
separation using deep recurrent neural networks,” in *International
conference on signal processing and communications*, 2016.

</div>

<div id="ref-yegnanarayana91">

\[314\] B. Yegnanarayana, H. A. Murthy, and V. R. Ramachandran,
“Processing of noisy speech using modified group delay functions,” in
*IEEE international conference on acoustics, speech and signal
processing*, 1991.

</div>

<div id="ref-fan16">

\[315\] Z.-C. Fan, J.-S. R. Jang, and C.-L. Lu, “Singing voice
separation and pitch extraction from monaural polyphonic audio music via
DNN and adaptive pitch tracking,” in *IEEE international conference on
multimedia big data*, 2016.

</div>

<div id="ref-avendano03">

\[316\] C. Avendano, “Frequency-domain source identification and
manipulation in stereo mixes for enhancement, suppression and re-panning
applications,” in *IEEE workshop on applications of signal processing to
audio and acoustics*, 2003.

</div>

<div id="ref-avendano02">

\[317\] C. Avendano and J.-M. Jot, “Frequency domain techniques for
stereo to multichannel upmix,” in *AES 22nd international conference*,
2002.

</div>

<div id="ref-barry04">

\[318\] D. Barry, B. Lawlor, and E. Coyle, “Sound source separation:
Azimuth discrimination and resynthesis,” in *7th international
conference on digital audio effects*, 2004.

</div>

<div id="ref-vinyes06">

\[319\] M. Vinyes, J. Bonada, and A. Loscos, “Demixing commercial music
productions via human-assisted time-frequency masking,” in *120th aes
convention*, 2006.

</div>

<div id="ref-cobos082">

\[320\] M. Cobos and J. J. López, “Stereo audio source separation based
on time-frequency masking and multilevel thresholding,” *Digital Signal
Processing*, vol. 18, no. 6, pp. 960–976, Nov. 2008.

</div>

<div id="ref-yilmaz04">

\[321\] Ö. Yilmaz and S. Rickard, “Blind separation of speech mixtures
via time-frequency masking,” *IEEE Transactions on Signal Processing*,
vol. 52, no. 7, pp. 1830–1847, Jul. 2004.

</div>

<div id="ref-otsu79">

\[322\] N. Otsu, “A threshold selection method from gray-level
histograms,” *IEEE Transactions on Systems, Man, and Cybernetics*, vol.
9, no. 1, pp. 62–66, Jan. 1979.

</div>

<div id="ref-sofianos10">

\[323\] S. Sofianos, A. Ariyaeeinia, and R. Polfreman, “Towards
effective singing voice extraction from stereophonic recordings,” in
*IEEE international conference on acoustics, speech and signal
processing*, 2010.

</div>

<div id="ref-sofianos102">

\[324\] S. Sofianos, A. Ariyaeeinia, and R. Polfreman, “Singing voice
separation based on non-vocal independent component subtraction,” in
*13th international conference on digital audio effects*, 2010.

</div>

<div id="ref-sofianos12">

\[325\] S. Sofianos, A. Ariyaeeinia, R. Polfreman, and R. Sotudeh,
“H-semantics: A hybrid approach to singing voice separation,” *Journal
of the Audio Engineering Society*, vol. 60, no. 10, pp. 831–841, Oct.
2012.

</div>

<div id="ref-kim11">

\[326\] M. Kim, S. Beack, K. Choi, and K. Kang, “Gaussian mixture model
for singing voice separation from stereophonic music,” in *AES 43rd
conference*, 2011.

</div>

<div id="ref-cobos08">

\[327\] M. Cobos and J. J. López, “Singing voice separation combining
panning information and pitch tracking,” in *AES 124th convention*,
2008.

</div>

<div id="ref-fitzgerald13">

\[328\] D. FitzGerald, “Stereo vocal extraction using ADRess and nearest
neighbours median filtering,” in *16th international conference on
digital audio effects*, 2013.

</div>

<div id="ref-fitzgerald132">

\[329\] D. FitzGerald and R. Jaiswal, “Improved stereo instrumental
track recovery using median nearest-neighbour inpainting,” in *24th iet
irish signals and systems conference*, 2013.

</div>

<div id="ref-alder12">

\[330\] A. Adler, V. Emiya, M. G. Jafari, M. Elad, R. Gribonval, and M.
D. Plumbley, “Audio inpainting,” *IEEE Transactions on Audio, Speech,
and Language Processing*, vol. 20, no. 3, pp. 922–932, Mar. 2012.

</div>

<div id="ref-ozerov09">

\[331\] A. Ozerov and C. Févotte, “Multichannel nonnegative matrix
factorization in convolutive mixtures with application to blind audio
source separation,” in *IEEE international conference on acoustics,
speech and signal processing*, 2009.

</div>

<div id="ref-ozerov10">

\[332\] A. Ozerov and C. Févotte, “Multichannel nonnegative matrix
factorization in convolutive mixtures for audio source separation,”
*IEEE Transactions on Audio, Speech, and Language Processing*, vol. 18,
no. 3, pp. 550–563, Mar. 2010.

</div>

<div id="ref-ozerov11">

\[333\] A. Ozerov, C. Févotte, R. Blouet, and J.-L. Durrieu,
“Multichannel nonnegative tensor factorization with structured
constraints for user-guided audio source separation,” in *IEEE
international conference on acoustics, speech and signal processing*,
2011.

</div>

<div id="ref-liutkus10">

\[334\] A. Liutkus, R. Badeau, and G. Richard, “Informed source
separation using latent components,” in *9th international conference on
latent variable analysis and signal separation*, 2010.

</div>

<div id="ref-fevotte10">

\[335\] C. Févotte and A. Ozerov, “Notes on nonnegative tensor
factorization of the spectrogram for audio source separation:
Statistical insights and towards self-clustering of the spatial cues,”
in *7th international symposium on computer music modeling and
retrieval*, 2010.

</div>

<div id="ref-ozerov14">

\[336\] A. Ozerov, N. Duong, and L. Chevallier, “On monotonicity of
multiplicative update rules for weighted nonnegative tensor
factorization,” in *International symposium on nonlinear theory and its
applications*, 2014.

</div>

<div id="ref-sawada11">

\[337\] H. Sawada, H. Kameoka, S. Araki, and N. Ueda, “New formulations
and efficient algorithms for multichannel NMF,” in *IEEE workshop on
applications of signal processing to audio and acoustics*, 2011.

</div>

<div id="ref-sawada12">

\[338\] H. Sawada, H. Kameoka, S. Araki, and N. Ueda, “Efficient
algorithms for multichannel extensions of Itakura-Saito nonnegative
matrix factorization,” in *IEEE international conference on acoustics,
speech and signal processing*, 2012.

</div>

<div id="ref-sawada13">

\[339\] H. Sawada, H. Kameoka, S. Araki, and N. Ueda, “Multichannel
extensions of non-negative matrix factorization with complex-valued
data,” *IEEE Transactions on Audio, Speech, and Language Processing*,
vol. 21, no. 5, pp. 971–982, May 2013.

</div>

<div id="ref-sivasankaran15">

\[340\] S. Sivasankaran *et al.*, “Robust ASR using neural network based
speech enhancement and feature simulation,” in *IEEE automatic speech
recognition and understanding workshop*, 2015.

</div>

<div id="ref-nugraha162">

\[341\] A. A. Nugraha, A. Liutkus, and E. Vincent, “Multichannel audio
source separation with deep neural networks,” *IEEE/ACM Transactions on
Audio, Speech, and Language Processing*, vol. 24, no. 9, pp. 1652–1664,
Sep. 2016.

</div>

<div id="ref-nugraha15">

\[342\] A. A. Nugraha, A. Liutkus, and E. Vincent, “Multichannel audio
source separation with deep neural networks,” Inria, 2015.

</div>

<div id="ref-nugraha16">

\[343\] A. A. Nugraha, A. Liutkus, and E. Vincent, “Multichannel music
separation with deep neural networks,” in *24th european signal
processing conference*, 2016.

</div>

<div id="ref-duong10">

\[344\] N. Q. K. Duong, E. Vincent, and R. Gribonval, “Under-determined
reverberant audio source separation using a full-rank spatial covariance
model,” *IEEE Transactions on Audio, Speech, and Language Processing*,
vol. 18, no. 7, pp. 1830–1840, Sep. 2010.

</div>

<div id="ref-ozerov112">

\[345\] A. Ozerov, A. Liutkus, R. Badeau, and G. Richard, “Informed
source separation: Source coding meets source separation,” in *IEEE
workshop on applications of signal processing to audio and acoustics*,
2011.

</div>

<div id="ref-zwicker13">

\[346\] E. Zwicker and H. Fastl, *Psychoacoustics: Facts and models*.
Springer-Verlag Berlin Heidelberg, 2013.

</div>

<div id="ref-rix01">

\[347\] A. W. Rix, J. G. Beerends, M. P. Hollier, and A. P. Hekstra,
“Perceptual evaluation of speech quality (PESQ)-a new method for
speech quality assessment of telephone networks and codecs,” in *IEEE
international conference on acoustics, speech and signal processing*,
2001.

</div>

<div id="ref-wang09">

\[348\] Z. Wang and A. C. Bovik, “Mean squared error: Love it or leave
it? A new look at signal fidelity measures,” *IEEE Signal Processing
Magazine*, vol. 26, no. 1, pp. 98–117, Jan. 2009.

</div>

<div id="ref-barker15">

\[349\] J. Barker, R. Marxer, E. Vincent, and S. Watanabe, “The third
‘CHiME’ speech separation and recognition challenge: Dataset, task and
baselines,” in *IEEE workshop on automatic speech recognition and
understanding*, 2015.

</div>

<div id="ref-recommendation2001MUSHRA">

\[350\] I. Recommendation, “Bs. 1534-1. method for the subjective
assessment of intermediate sound quality (MUSHRA),” *International
Telecommunications Union, Geneva*, 2001.

</div>

<div id="ref-vincent062">

\[351\] E. Vincent, M. Jafari, and M. Plumbley, “Preliminary guidelines
for subjective evaluation of audio source separation algorithms,” in
*ICA research network international workshop*, 2006.

</div>

<div id="ref-cano11">

\[352\] E. Cano, C. Dittmar, and G. Schuller, “Influence of phase,
magnitude and location of harmonic components in the perceived quality
of extracted solo signals,” in *AES 42nd conference on semantic audio*,
2011.

</div>

<div id="ref-fevotte05">

\[353\] C. Févotte, R. Gribonval, and E. Vinvent, “BSS\_EVAL toolbox
user guide - revision 2.0,” IRISA, 2005.

</div>

<div id="ref-vincent06">

\[354\] E. Vincent, R. Gribonval, and C. Févotte, “Performance
measurement in blind audio source separation,” *IEEE Transactions on
Audio, Speech, and Language Processing*, vol. 14, no. 4, pp. 1462–1469,
Jul. 2006.

</div>

<div id="ref-fox07">

\[355\] B. Fox, A. Sabin, B. Pardo, and A. Zopf, “Modeling perceptual
similarity of audio signals for blind source separation evaluation,” in
*7th international conference on latent variable analysis and signal
separation*, 2007.

</div>

<div id="ref-fox072">

\[356\] B. Fox and B. Pardo, “Towards a model of perceived quality of
blind audio source separation,” in *IEEE international conference on
multimedia and expo*, 2007.

</div>

<div id="ref-kornycky08">

\[357\] J. Kornycky, B. Gunel, and A. Kondoz, “Comparison of subjective
and objective evaluation methods for audio source separation,” *Journal
of the Acoustical Society of America*, vol. 4, no. 1, 2008.

</div>

<div id="ref-emiya10">

\[358\] V. Emiya, E. Vincent, N. Harlander, and V. Hohmann,
“Multi-criteria subjective and objective evaluation of audio source
separation,” in *38th international aes conference*, 2010.

</div>

<div id="ref-emiya11">

\[359\] V. Emiya, E. Vincent, N. Harlander, and V. Hohmann, “Subjective
and objective quality assessment of audio source separation,” *IEEE
Transactions on Audio, Speech, and Language Processing*, vol. 19, no. 7,
pp. 2046–2057, Sep. 2011.

</div>

<div id="ref-vincent122">

\[360\] E. Vincent, “Improved perceptual metrics for the evaluation of
audio source separation,” in *10th international conference on latent
variable analysis and signal separation*, 2012.

</div>

<div id="ref-cartwright16">

\[361\] M. Cartwright, B. Pardo, G. J. Mysore, and M. Hoffman, “Fast and
easy crowdsourced perceptual audio evaluation,” in *IEEE international
conference on acoustics, speech and signal processing*, 2016.

</div>

<div id="ref-gupta15">

\[362\] U. Gupta, E. Moore, and A. Lerch, “On the perceptual relevance
of objective source separation measures for singing voice separation,”
in *IEEE workshop on applications of signal processing to audio and
acoustics*, 2005.

</div>

<div id="ref-stoter16">

\[363\] F.-R. Stöter, A. Liutkus, R. Badeau, B. Edler, and P. Magron,
“Common fate model for unison source separation,” in *IEEE
international conference on acoustics, speech and signal processing*,
2016.

</div>

<div id="ref-roma16">

\[364\] G. Roma, E. M. Grais, A. J. Simpson, I. Sobieraj, and M. D.
Plumbley, “Untwist: A new toolbox for audio source separation,” in *17th
international society on music information retrieval conference*, 2016.

</div>
</div>
