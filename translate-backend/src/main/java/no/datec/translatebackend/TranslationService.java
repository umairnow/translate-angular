package no.datec.translatebackend;

import java.util.List;

public interface TranslationService {
    boolean addTranslation(Translation translation);
    boolean addTranslations(List<Translation> translations);
    boolean deleteTranslation(String key);
    List<Translation> getTranslations();
}
