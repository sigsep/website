# ▶️ umx.js - web demo
[![Web Audio Paper (PDF)](https://img.shields.io/badge/web%20audio%20conference%20paper-pdf-orange.svg)](https://webaudioconf2021.com/wp-content/uploads/2021/06/stoeter_wac.pdf) [![Repository](https://img.shields.io/badge/github-repository-blue.svg)](https://github.com/sigsep/open-unmix-js/)

In this demo, we showcase an audio separation models that performs separation in the browser. The  model is derived from the full open-unmix. The models were converted to tensorflow via ONNX and on-the-wire weight quantization was applied to reduce the models file size. We manually converted the python-based pre-and post-processing pipelines from Python to JavaScript. Thus, as part of the release of this demo, we make a fully invertible tensorflow.js pipeline available.

::: warning Note
Note, that the model is very slow and we do not advice to separate tracks longer than 30 seconds.
:::

<iframe src="https://sigsep.github.io/open-unmix-js/" width="100%" height="680" frameborder="0"></iframe>

## Cite

```latex
@proceedings{stoteropen,
  title={open.unmix.app-towards audio separation on the edge},
  conference="2021 Web Audio Conference",
  author={
      St{\"o}ter, Fabian-Robert and Machry, Maria Clara and de Andrade Vaz, Delton and Uhlich, Stefan and Mitsufuji, Yuki and Liutkus, Antoine}
}
```