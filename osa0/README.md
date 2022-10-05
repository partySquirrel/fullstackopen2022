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


## Osa 0.6
