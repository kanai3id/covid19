(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{499:function(t,e,r){"use strict";r.r(e);var c=r(104),n=r(321),d=r(352),o=r(324),h=r(354),m=r(355),l=r(363),f=r(361),$=r(364),C=r(365),k=r(359),w=r(360),v=r(358),y=r(356),j=r(357),A=r(362),_={components:{ConfirmedCasesDetailsCard:m.a,ConfirmedCasesNumberCard:l.a,ConfirmedCasesAttributesCard:f.a,InspectionPersonsNumberCard:$.a,ConsultationDeskReportsNumberCard:C.a,AgeCard:k.a,ResidentialAreaCard:w.a,StayCard:v.a,BedsCard:y.a,GenderCard:j.a,AdjacentPrefectureCard:A.a},data:function(){var title,t;switch(this.$route.params.card){case"details-of-confirmed-cases":title=this.$t("検査陽性者の状況"),t=c.patients.date;break;case"number-of-confirmed-cases":title=this.$t("陽性患者数"),t=c.patients.date;break;case"attributes-of-confirmed-cases":title=this.$t("陽性患者の属性"),t=c.patients.date;break;case"number-of-inspection-persons":title=this.$t("検査実施人数"),t=c.inspection_persons.date;break;case"number-of-reports-to-covid19-consultation-desk":title=this.$t("新型コロナ受診相談窓口相談件数"),t=c.querents.date;break;case"card":title=this.$t("年代別陽性患者数"),t=n.last_update;break;case"residential-area-card":title=this.$t("居住地の状況"),t=d.date;break;case"stay-card":title=this.$t("入院患者日数"),t=o.last_update;break;case"beds-card":title=this.$t("入院患者数と病床数");break;case"gender-card":title=this.$t("性別陽性患者数");break;case"adjacent-prefecture-card":title=this.$t("隣接県の状況"),t=h.date}var data={title:title,updatedAt:t};return data},head:function(){var t="https://covid19-nagano.info",e=(new Date).getTime(),r="ja"===this.$i18n.locale?"".concat(t,"/ogp/").concat(this.$route.params.card,".png?t=").concat(e):"".concat(t,"/ogp/").concat(this.$i18n.locale,"/").concat(this.$route.params.card,".png?t=").concat(e),c="".concat(this.updatedAt," | ").concat(this.$t("当サイトは新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために、長野県出身の個人(ITエンジニア)が長野県非公式で開設したものです。"));return{title:this.title,meta:[{hid:"og:url",property:"og:url",content:t+this.$route.path+"/"},{hid:"og:title",property:"og:title",content:this.title+" | "+this.$t("長野県")+" "+this.$t("新型コロナウイルス感染症")+this.$t("対策サイト")},{hid:"description",name:"description",content:c},{hid:"og:description",property:"og:description",content:c},{hid:"og:image",property:"og:image",content:r},{hid:"twitter:image",name:"twitter:image",content:r}]}}},D=r(5),component=Object(D.a)(_,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",["details-of-confirmed-cases"==this.$route.params.card?e("confirmed-cases-details-card"):"number-of-confirmed-cases"==this.$route.params.card?e("confirmed-cases-number-card"):"attributes-of-confirmed-cases"==this.$route.params.card?e("confirmed-cases-attributes-card"):"number-of-inspection-persons"==this.$route.params.card?e("inspection-persons-number-card"):"number-of-reports-to-covid19-consultation-desk"==this.$route.params.card?e("consultation-desk-reports-number-card"):"age-card"==this.$route.params.card?e("age-card"):"residential-area-card"==this.$route.params.card?e("residential-area-card"):"stay-card"==this.$route.params.card?e("stay-card"):"beds-card"==this.$route.params.card?e("beds-card"):"gender-card"==this.$route.params.card?e("gender-card"):"adjacent-prefecture-card"==this.$route.params.card?e("adjacent-prefecture-card"):this._e()],1)}),[],!1,null,null,null);e.default=component.exports}}]);