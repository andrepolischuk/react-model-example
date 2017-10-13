# model

* Simple model
* Not mutable internal state
* All updates only through effects functions
* Getters for state
* Computed selectors

## Lifecycle

```
-> effect() -> update -> ...transform() -> commit() -> next state -> ...observer()
```
