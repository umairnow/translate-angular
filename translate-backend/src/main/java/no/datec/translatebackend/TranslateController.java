package no.datec.translatebackend;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class TranslateController {

    @Autowired
    TranslationService translationService;

    @GetMapping(value = {"/translate/translations.json"},  produces = {MediaType.APPLICATION_JSON_VALUE})
    public List<Translation> addTranslation() throws IOException {
        return translationService.getTranslations();
    }

    @PostMapping(value = {"/translate/translation.json"},
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public boolean addTranslation(@RequestBody Translation translation) throws IOException {
        return translationService.addTranslation(translation);
    }

    @PutMapping(value = {"/translate/translation.json"},
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public boolean updateTranslation(@RequestBody Translation translation) throws IOException {
        return translationService.updateTranslation(translation);
    }

    @PostMapping(value = {"/translate/translations.json"},
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public boolean addTranslations(@RequestBody List<Translation> translations) throws IOException {
        return translationService.addTranslations(translations);
    }

    @DeleteMapping("/translate/translation/{key}.json")
    public boolean deleteTranslation(@PathVariable String key) throws IOException {
        return translationService.deleteTranslation(key);
    }
}
