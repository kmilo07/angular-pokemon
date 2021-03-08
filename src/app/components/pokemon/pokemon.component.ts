import { Component, OnInit } from "@angular/core";
import { __await } from "tslib";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-pokemon",
  templateUrl: "./pokemon.component.html",
  styleUrls: ["./pokemon.component.css"]
})
export class PokemonComponent implements OnInit {
  public pokemon: any = {};
  public pokemones: any[] = [];
  public direccionAnterior: String = "";
  public direccionSiguiente: String = "";
  public contador = 1;
  constructor(private pokemonService: PokemonService) {}
  ngOnInit() {
    this.getPokemons();
  }
  getPokemons() {
    this.pokemonService.buscarPokemones().subscribe(
      (res: any) => {
        this.direccionSiguiente = res.next;
        res.results.forEach(element => {
          this.pokemonService
            .buscarPokemoNombre(element.name)
            .subscribe((repuesta: any) => {
              this.pokemones.push(repuesta);
            });
        });
      },
      error => {}
    );
  }

  getPokemonsSiguientes(valor: string) {
    this.contador++;
    this.pokemones = [];
    this.pokemonService.buscarPokemonesDireccion(valor).subscribe(
      (res: any) => {
        this.direccionAnterior = res.previous;
        this.direccionSiguiente = res.next;
        res.results.forEach(element => {
          this.pokemonService
            .buscarPokemoNombre(element.name)
            .subscribe((repuesta: any) => {
              this.pokemones.push(repuesta);
            });
        });
      },
      error => {}
    );
  }

  getPokemonsAtras(valor: string) {
    if (this.contador > 0) {
      this.contador--;
    }

    this.pokemones = [];
    this.pokemonService.buscarPokemonesDireccion(valor).subscribe(
      (res: any) => {
        this.direccionAnterior = res.previous;
        this.direccionSiguiente = res.next;
        res.results.forEach(element => {
          this.pokemonService
            .buscarPokemoNombre(element.name)
            .subscribe((repuesta: any) => {
              this.pokemones.push(repuesta);
            });
        });
      },
      error => {}
    );
  }

  getTipo(value: string) {
    this.pokemonService.buscarTipo(value).subscribe(
      res => {
        console.log(res);
        return res;
      },
      err => {}
    );
  }
  buscarPokemon(valor: string) {
    if (valor.length > 0) {
      this.pokemones = [];
      this.pokemonService.buscarPokemoNombre(valor.toLowerCase()).subscribe(
        (res: any) => {
          this.pokemones.push(res);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.getPokemons();
    }
  }
}
