package no.datec.translatebackend;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;

@Service("translationService")
public class ManageTranslations implements TranslationService{
    private final String documentName = "datec-translate.json";
    private List<Translation> translationList;

    @Override
    public boolean addTranslation(Translation translation) {
        getTranslations().add(translation);
        return storeFile() != null;
    }

    @Override
    public boolean updateTranslation(Translation translation) {
        if (getTranslations().removeIf(t -> t.getKey().equals(translation.getKey()))) {
            getTranslations().add(translation);
        }
        return storeFile() != null;
    }

    @Override
    public boolean addTranslations(List<Translation> translations) {
        translationList = translations;
        return storeFile() != null;
    }

    @Override
    public boolean deleteTranslation(String key) {
        getTranslations().removeIf(translation -> translation.getKey().equals(key));
        return storeFile() != null;
    }

    @Override
    public List<Translation> getTranslations() {
        if (translationList == null) {
            Path fileStorageLocation = Paths.get(documentName).toAbsolutePath().normalize();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                translationList = Arrays.asList(objectMapper.readValue(fileStorageLocation.toFile(), Translation[].class));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return translationList;
    }

    private Path storeFile() {
        Path path = null;
        try {
            String json = new ObjectMapper().writeValueAsString(translationList);
            path = Files.write(Paths.get(documentName).toAbsolutePath().normalize(), json.getBytes(),
                    StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return path;
    }
}
