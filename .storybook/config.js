import Vue from 'vue';
import { configure } from '@storybook/vue'
import '../src/assets/GlobalStyle.scss'

configure(require.context('../src/components/', true, /\.stories\.js$/), module)
