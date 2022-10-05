# Osa 0 vastaukset

## Osa 0.4

Kaavio, joka kuvaa mitä tapahtuu tilanteessa, missä käyttäjä luo uuden muistiinpanon ollessaan sivulla https://studies.cs.helsinki.fi/exampleapp/notes, eli kirjoittaa tekstikenttään jotain ja painaa nappia tallenna.
 

``` mermaid
sequenceDiagram

    rect rgba(204, 255, 204, 0.3)
    note over selain: Käyttäjä on kirjoittanut tekstikentään muistiinpanon ja painaa tallenna-nappia
    selain->>+palvelin: HTTP POST /exampleapp/new_note application/x-www-form-urlencoded payload: note=Terve
    palvelin-->>-selain: HTTP 302 uudelleenohjaus sivulle /exampleapp/notes 
    end  
    
    note right of selain: Tallennuksen jälkeen sivu automaattisesti uudelleenladataan, jotta päivittynyt tieto tulee näkyviin. 
    
    
    rect rgba(255, 229, 204, 0.3)
    selain->>+palvelin: HTTP GET /exampleapp/notes
    palvelin-->>-selain: HTTP 200 sivun HTML-koodi
    
    selain->>+palvelin: HTTP GET /exampleapp/main.css
    palvelin-->>-selain: HTTP 200 main.css tyylitiedosto
    
    selain->>+palvelin: HTTP GET /exampleapp/main.js
    palvelin-->>-selain: HTTP 200 main.js javascript tiedosto
    
    note over selain: JS hakee JSON muodossa listan muistiinpanoista
    
    selain->>+palvelin: HTTP GET /exampleapp/data.json
    palvelin-->>-selain: HTTP 200 text/json lista muistiinpanoista JSON muodossa
    
    note right of selain: Päivittynyt sivu on uudelleenladattu selaimeen
    
    end 
    
```


## Osa 0.5

Tee kaavio tilanteesta, jossa käyttäjä menee selaimella osoitteeseen https://studies.cs.helsinki.fi/exampleapp/spa eli muistiinpanojen Single Page App-versioon

``` mermaid
sequenceDiagram
    
    rect rgba(255, 229, 204, 0.3)
    selain->>+palvelin: HTTP GET /exampleapp/spa
    palvelin-->>-selain: HTTP 200 sivun HTML-koodi
    
    selain->>+palvelin: HTTP GET /exampleapp/main.css
    palvelin-->>-selain: HTTP 200 main.css tyylitiedosto
    
    selain->>+palvelin: HTTP GET /exampleapp/spa.js
    palvelin-->>-selain: HTTP 200 main.js javascript tiedosto
    
    note over selain: JS hakee JSON muodossa listan muistiinpanoista
    
    selain->>+palvelin: HTTP GET /exampleapp/data.json
    palvelin-->>-selain: HTTP 200 text/json lista muistiinpanoista JSON muodossa
       
    end 
    
```

## Osa 0.6

Tee kaavio tilanteesta, jossa käyttäjä luo uuden muistiinpanon single page -versiossa.

``` mermaid
sequenceDiagram

    
    note over selain: Käyttäjä on kirjoittanut tekstikentään muistiinpanon ja painaa tallenna-nappia.
    
    rect rgba(204, 255, 204, 0.3)
    note right of selain: Javascript lisää uuden muistiinpanon sivulle listaan.  
     
    note right of selain: Javascript lähettää uuden muistiinpanon palvelimelle.  
    
    selain->>+palvelin: HTTP POST /exampleapp/new_note_spa payload application/json {"content":"terve","date":"2022-10-05T13:21:12.660Z"}
    palvelin-->>-selain: HTTP 201 created 
    end  
    
    note right of selain: Päivitetty tieto näkyy ilman sivun uudelleenlatausta. 
    note right of selain: Tieto ei ole kuitenkaan välttämättä onnistuneesti tallentunut palvelimella. 
    
    
```

