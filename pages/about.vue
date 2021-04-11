<template>
  <div class="About">
    <page-header class="mb-3">
      {{ $t('当サイトについて') }}
    </page-header>
    <static-card>
      {{
        $t(
          '当サイトは新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために、長野県出身の個人(ITエンジニア)が長野県非公式で開設したものです。'
        )
      }}<br />
      <i18n
        tag="p"
        path="複製・改変が許されたオープンソースライセンスで公開されている、{covid19-web}の{covid19-github}を利用しています。"
      >
        <template v-slot:covid19-web>
          <a
            href="https://stopcovid19.metro.tokyo.lg.jp/"
            target="_blank"
            rel="noopener"
          >
            {{ $t('東京都公式新型コロナウイルス対策サイト') }}
          </a>
        </template>
        <template v-slot:covid19-github>
          <a
            href="https://github.com/tokyo-metropolitan-gov/covid19"
            target="_blank"
            rel="noopener"
          >
            {{ $t('仕組み') }}
          </a>
        </template>
      </i18n>
      <p>
        {{
          $t(
            '長野県による公式情報と客観的な数値をわかりやすく伝えることで、長野県にお住まいの方や、長野県内に拠点を持つ企業の方、長野県を訪れる方が、現状を把握して適切な対策を取れるようにすることを目的としています。'
          )
        }}
      </p>
    </static-card>
    <static-card>
      <h3>{{ $t('ブラウザ環境について') }}</h3>
      <p>
        {{ $t('当サイトは以下の環境でご覧いただくことを推奨いたします。') }}
      </p>
      <ul>
        <li>{{ $t('Microsoft Edge 最新版') }}</li>
        <li>{{ $t('Mozilla Firefox 最新版') }}</li>
        <li>
          {{ $t('Google Chrome 最新版（Windows 10以上, Android 8.0以上）') }}
        </li>
        <li>{{ $t('Safari 最新版（macOS, iOS）') }}</li>
        <li>{{ $t('Opera Software ASA Opera 最新版') }}</li>
      </ul>
      <p class="StaticCard-Note">
        <span>{{ $t('※') }}</span>
        <span>
          {{
            $t(
              '※ 推奨環境以外で利用された場合や、推奨環境下でもご利用のブラウザの設定等によっては、正しく表示されない場合がありますのでご了承ください。'
            )
          }}
        </span>
      </p>
    </static-card>

    <a id="data" name="data" />
    <static-card>
      <h3>{{ $t('データについて') }}</h3>
      {{
        $t(
          '当サイトのデータは、長野県のオープンデータサイトからデータを取得、及びニュース記事についてはWebページをスクレイピングして取得し情報を更新しています。'
        )
      }}
      {{ $t('現在利用しているオープンデータは以下の通りです。') }}
      <ul>
        <li>
          <a
            href="https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html"
            target="_blank"
            rel="noopener"
          >
            {{ $t('長野県内における新型コロナウイルス感染症の動向') }}
          </a>
        </li>
        <ul>
          <li>
            {{ $t('検査陽性者の状況') }}
          </li>
          <li>
            {{ $t('陽性患者の属性') }}
          </li>
          <li>
            {{ $t('陽性患者数') }}
          </li>
          <li>
            {{ $t('居住地の状況') }}
          </li>
          <li>
            {{ $t('年代別陽性患者数') }}
          </li>
          <li>
            {{ $t('入院中患者日数') }}
          </li>
          <li>
            {{ $t('検査実施件数') }}
          </li>
          <li>
            {{ $t('新型コロナ受診相談窓口相談件数') }}
          </li>
        </ul>
      </ul>
      <p class="StaticCard-Note">
        <span>
          {{ $t('行政の皆さまのご協力に感謝します。') }}<br />
          <a
            href="https://www.pref.nagano.lg.jp/joho/kensei/tokei/johoka/opendata/documents/terms-of-use_r2.pdf"
            target="_blank"
            rel="noopener"
          >
            {{ $t('長野県オープンデータ利用規約') }}
          </a>
        </span>
      </p>
      <span><p /></span>
      <p class="StaticCard-Note">
        <span>
          {{
            $t(
              '隣接県の状況は TOYO KEIZAI ONLINE様 のデータを利用しています。'
            )
          }}<br />
          {{ $t('このようなソリューションの提供に感謝します。') }}<br />
          <a
            href="https://toyokeizai.net/sp/visual/tko/covid19/"
            target="_blank"
            rel="noopener"
          >
            {{ $t('TOYO KEIZAI ONLINE様') }}
          </a>
          <br />
          {{ $t('MITライセンス') }}
        </span>
      </p>
      <span><p /></span>
      <p class="StaticCard-Note">
        <span>
          {{
            $t(
              '長野駅周辺滞在人口の増加率は NTTドコモ モバイル空間統計様 のデータを利用しています。'
            )
          }}<br />
          {{ $t('このようなソリューションの提供に感謝します。') }}<br />
          <a
            href="https://mobaku.jp/covid-19/"
            target="_blank"
            rel="noopener"
          >
            {{ $t('出典元：NTTドコモ モバイル空間統計') }}
          </a>
        </span>
      </p>
    </static-card>

    <static-card>
      <h3>{{ $t('当サイトへのリンクについて') }}</h3>
      <p>{{ $t('当サイトへのリンクは自由です。') }}</p>
    </static-card>
    <static-card>
      <h3>{{ $t('JavaScriptについて') }}</h3>
      <p>
        {{ $t('当サイトではJavaScriptを使用しております。') }}<br />
        {{
          $t(
            'JavaScriptを無効にして使用された場合、各ページが正常に動作しない、または、表示されない場合がございます。'
          )
        }}<br />
        {{
          $t(
            '当サイトをご利用の際には、JavaScriptを有効にして頂きますようお願いいたします。'
          )
        }}
      </p>
    </static-card>
    <static-card>
      <h3>{{ $t('クッキー (Cookie) について') }}</h3>
      <p>
        {{ $t('当サイトの一部ではクッキーを使用しています。') }}<br />
        {{
          $t(
            'クッキーとは、Webコンテンツからの要求で利用者の手元の端末に一時的に保存されるデータのことで、当サイトでは利用状況の把握のためにクッキーを使用する場合があります。'
          )
        }}<br />
      </p>
      <p>
        {{
          $t(
            'ブラウザに関する情報の収集を希望しない場合は、インターネット閲覧ソフト（ブラウザ）をご自身で設定することにより、クッキーの機能が働かないようにすることも可能です。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'ただし、クッキーを受け入れない設定をされている場合は、当サイトの機能が正常に動作しない場合がございます。'
          )
        }}
      </p>
    </static-card>
    <static-card>
      <h3>{{ $t('Google Analyticsの利用について') }}</h3>
      <p>
        {{
          $t(
            '当サイトでは、サービス向上やサイトの改善のためにGoogle LLCの提供するアクセス分析のツールであるGoogle Analyticsを利用した計測を行っております。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'Google Analyticsでは、当サイトが発行するクッキー (Cookie) 等を利用して、Webサイトの利用データ（アクセス状況、トラフィック、閲覧環境、IPアドレスなど）を収集しております。クッキーの利用に関してはGoogleのプライバシーポリシーと規約に基づいております。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            '取得したデータはWebサイト利用状況を分析しサービスの改善につなげるため、またはサイト運営者へのレポートを作成するため、その他のサービスの提供に関わる目的に限り、これを使用します。（サイト運営者へのレポートでは、クッキーはブラウザ単位で本サイトのユーザー数をカウントするため、IPアドレスはGoogle Analyticsの分析機能を通じてアクセス元の地域分布（国、州・都道府県、都市）を把握するために利用されています。）'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'Google Analyticsの利用規約及びプライバシーポリシーに関する説明については、Google Analyticsのサイトをご覧ください。'
          )
        }}
      </p>
      <ul>
        <li>
          <external-link
            :url="
              $t(
                'https://marketingplatform.google.com/about/analytics/terms/jp/'
              )
            "
            :icon-size="16"
          >
            {{ $t('Google Analytics利用規約') }}
          </external-link>
        </li>
        <li>
          <external-link
            :url="$t('https://policies.google.com/privacy?hl=ja')"
            :icon-size="16"
          >
            {{ $t('Googleのプライバシーポリシー') }}
          </external-link>
        </li>
        <li>
          <external-link
            :url="
              $t('https://support.google.com/analytics/answer/6004245?hl=ja')
            "
            :icon-size="16"
          >
            {{ $t('Google Analyticsに関する詳細情報') }}
          </external-link>
        </li>
      </ul>
      <i18n
        tag="p"
        path="Google Analyticsによる情報送信を回避する場合は、Google がサポートする{addon}をご利用ください。"
      >
        <template v-slot:addon>
          <external-link
            :url="$t('https://tools.google.com/dlpage/gaoptout?hl=ja')"
            :icon-size="16"
          >
            {{ $t('測定を無効にするブラウザ アドオン') }}
          </external-link>
        </template>
      </i18n>
    </static-card>
    <static-card>
      <h3>{{ $t('免責事項') }}</h3>
      <p>
        {{
          $t(
            '当サイトに掲載されている情報の正確性については万全を期していますが、長野県は利用者が当サイトの情報を用いて行う一切の行為について責任を負うものではありません。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            'また、利用者が当サイトを利用したことにより発生した利用者の損害及び利用者が第三者に与えた損害に対して、責任を負うものではありません。'
          )
        }}
      </p>
      <p>
        {{
          $t(
            '当サイトに掲載されている情報は、予告なしに変更又は削除することがあります。'
          )
        }}
      </p>
    </static-card>
    <static-card>
      <h3>{{ $t('ソースコードについて') }}</h3>
      <p>
        {{
          $t(
            '当サイトのソースコードはMITライセンスで公開されており、誰でも自由に利用することができます。'
          )
        }}
        <i18n path="詳しくは、{githubRepo}をご確認ください。">
          <template v-slot:githubRepo>
            <external-link
              url="https://github.com/kanai3id/covid19"
              :icon-size="16"
            >
              {{ $t('GitHub リポジトリ') }}
            </external-link>
          </template>
        </i18n>
      </p>
    </static-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PageHeader from '@/components/PageHeader.vue'
import StaticCard from '@/components/StaticCard.vue'
import ExternalLink from '@/components/ExternalLink.vue'

export default Vue.extend({
  components: {
    PageHeader,
    StaticCard,
    ExternalLink
  },
  head(): MetaInfo {
    return {
      title: this.$t('当サイトについて') as string
    }
  }
})
</script>
