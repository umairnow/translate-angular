export interface TranslateModel {
  key: string;
  english: string;
  swedish: string;
  norwegian: string;
  danish: string;
}

export interface TranslateSource {
  add: TranslateModel;
  update: TranslateModel;
  list: TranslateModel[];
  delete: TranslateModel;
}
