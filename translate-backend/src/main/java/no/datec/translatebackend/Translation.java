package no.datec.translatebackend;

public class Translation {
    private String key;
    private String english;
    private String norwegian;
    private String swedish;
    private String danish;

    public String getKey() {
        return key;
    }

    public String getEnglish() {
        return english;
    }

    public String getNorwegian() {
        return norwegian;
    }

    public String getSwedish() {
        return swedish;
    }

    public String getDanish() {
        return danish;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public void setEnglish(String english) {
        this.english = english;
    }

    public void setNorwegian(String norwegian) {
        this.norwegian = norwegian;
    }

    public void setSwedish(String swedish) {
        this.swedish = swedish;
    }

    public void setDanish(String danish) {
        this.danish = danish;
    }

    public void update(Translation translation) {
        this.setEnglish(translation.getEnglish());
        this.setNorwegian(translation.getNorwegian());
        this.setSwedish(translation.getSwedish());
        this.setDanish(translation.getDanish());
    }
}
