# Exercise 0.6: New note in Single page app diagram

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note right of browser: The browser sends a POST request to the server to create a new note with JSON data in the body

    server-->>browser: 201 Created response
    deactivate server

    Note right of browser: The browser stays on the same page and does not reload, just redraws the notes using JavaScript
```
