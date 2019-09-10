# DEMO + Results

## Demo Tracks

<iframe src="https://umx-sisec18.s3-website.eu-west-3.amazonaws.com/" width="100%" height="480" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Objective results on SiSEC 2018

Open-Unmix yields state-of-the-art results compared to participants from [SiSEC 2018](https://sisec18.unmix.app/#/methods). The performance of `UMXHQ` and `UMX` is almost identical since it was evaluated on compressed STEMS.
It can be seen that our proposed model reaches state-of-the-art results. There is no
statistically significant difference between the best method `TAK1` and
`UMX`. Because `TAK1` is not released as open-source, this indicates
that *Open-Unmix* is the current state-of-the-art open-source source
separation system.

![boxplot_updated](https://user-images.githubusercontent.com/72940/63944652-3f624c80-ca72-11e9-8d33-bed701679fe6.png)

Note that

1. [`STL1`, `TAK2`, `TAK3`, `TAU1`, `UHL3`, `UMXHQ`] were omitted as were trained on only _MUSDB18_.

### Scores 

|target|SDR  |SIR  | SAR | ISR | SDR | SIR | SAR | ISR |
|------|-----|-----|-----|-----|-----|-----|-----|-----|
|`model`|UMX  |UMX  |UMX  |UMX |UMXHQ|UMXHQ|UMXHQ|UMXHQ|
|vocals|6.32 |13.33| 6.52|11.93| 6.25|12.95| 6.50|12.70|
|bass  |5.23 |10.93| 6.34| 9.23| 5.07|10.35| 6.02| 9.71|
|drums |5.73 |11.12| 6.02|10.51| 6.04|11.65| 5.93|11.17|
|other |4.02 |6.59 | 4.74| 9.31| 4.28| 7.10| 4.62| 8.78|

note that the scores represent (Median of frames, Median of tracks)

If you want to compare the results to of `umx` or `umxhq` to your own methods, the evaluation scores are available for download here:

* [`umx` scores](https://zenodo.org/record/3370486/files/UMX-MUSDB18.zip?download=1)
* [`umxhq` scores](https://zenodo.org/record/3370489/files/UMXHQ-MUSDB18.zip?download=1)