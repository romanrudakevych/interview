// The English catalogue, re-exported so a test can assert on the string a
// component should render without hard-coding it. Hard-coded copy would make
// every wording change a test failure; this way only a *key* change does.
export { default as en } from "../../src/i18n/locales/en.js";
