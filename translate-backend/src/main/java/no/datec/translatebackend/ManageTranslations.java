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
    public boolean addTranslations(List<Translation> translations) {
        translationList = translations;
        return storeFile() != null;
    }

    @Override
    public boolean deleteTranslation(String key) {
        ArrayList<Integer> indices = new ArrayList<>();
        for (int i=0; i<getTranslations().size(); i++) {
            if (getTranslations().get(i).getKey().equals(key)) {
                indices.add(i);
            }
        }
        for (Integer i : indices) {
            getTranslations().remove(i);
        }
        return storeFile() != null;
    }

    @Override
    public List<Translation> getTranslations() {
        if (translationList == null) {
            Path fileStorageLocation = Paths.get(documentName).toAbsolutePath().normalize();
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                translationList = Arrays.asList(objectMapper.readValue(fileStorageLocation.toFile(), Translation[].class));
                if (translationList == null) translationList = new ArrayList<>();
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
