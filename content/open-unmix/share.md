# 🔗 share.unmix.app

[![Web Audio Paper (PDF)](https://img.shields.io/badge/web%20audio%20conference%20paper-pdf-orange.svg)](https://webaudioconf2021.com/wp-content/uploads/2021/06/stoeter_wac.pdf) [![Repository](https://img.shields.io/badge/github-repository-blue.svg)](https://github.com/sigsep/share/)

With the rise of commercial source separation products,users often want to share their separation results with otherusers on social media platforms. However, platforms such as Youtube, Soundcloud, Twitter, Facebook only allow singlestream audio content which is why users used non-optimalwork-arounds such as: uploading the separated stems individually, sharing mul-tiple links, producing  original video content where  streams  can  besoloed or muted, often screencasted from a DAW session host their own website that uses a multi-track audio player such as [waveform-playlist](https://github.com/naomiaro/waveform-playlist). While the latter is  often the most favorable solution to assess the separation quality, users often go with the first since its the  simplest  way. Here, we present our efforts to help users bridge this gap and offer a multi-trackaudio player, that is able to mix  audio stems on the fly, provided they are already hosted on static cloud storage suchas Dropbox. For this purpose, we aggregate the stem URLs in a Firestore database and offer a shareable link through aVue application. The share platform can be accessed via [here](https://share.unmix.app).

<iframe src="https://share.unmix.app/nFngXqmpUIMVo9JCv3tc" style="max-width: 800px;" width="100%" height="400px" frameborder="0"></iframe>

## Cite

```latex
@proceedings{stoteropen,
  title={open.unmix.app-towards audio separation on the edge},
  conference="2021 Web Audio Conference",
  author={
      St{\"o}ter, Fabian-Robert and Machry, Maria Clara and de Andrade Vaz, Delton and Uhlich, Stefan and Mitsufuji, Yuki and Liutkus, Antoine}
}
```