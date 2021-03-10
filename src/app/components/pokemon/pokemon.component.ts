import { Component, OnInit } from "@angular/core";
import { __await } from "tslib";
import { PokemonService } from "../../services/pokemon.service";
import Swal from 'sweetalert2'

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
        this.getPokemonconTipo(res);
      }
    );
  }

  getPokemonsSiguientes(valor: string) {
    this.contador++;
    this.pokemones = [];
    this.pokemonService.buscarPokemonesDireccion(valor).subscribe(
      (res: any) => {
        this.direccionAnterior = res.previous;
        this.direccionSiguiente = res.next;
        this.getPokemonconTipo(res);
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
        this.getPokemonconTipo(res);
      },
      error => {}
    );
  }

  getPokemonconTipo(res: any) {
    res.results.forEach(element => {
          this.pokemonService
            .buscarPokemoNombre(element.name)
            .subscribe((repuesta: any) => {
              this.pokemonService
                .buscarTipo(repuesta.types[0].type.url)
                .subscribe((respuesta: any) => {
                  repuesta.types[0].type.name = respuesta.names[4].name;
                  if(repuesta.types[1]?.type.url){
                    this.pokemonService.buscarTipo(repuesta.types[1]?.type.url)
                    .subscribe((respuesta: any)=>{
                      repuesta.types[1].type.name = respuesta.names[4].name;
                    })
                  }
                  this.pokemonService.buscarPoderesPokemones(repuesta.moves[0].move.url)
                  .subscribe((respuesta : any) =>{
                    repuesta.moves[0].move.name = respuesta.names[5].name;
                  })
                  if(repuesta.moves[1]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(repuesta.moves[1].move.url)
                    .subscribe((respuesta : any) =>{
                      repuesta.moves[1].move.name = respuesta.names[5].name;
                  })
                  }
                  if(repuesta.moves[2]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(repuesta.moves[2].move.url)
                    .subscribe((respuesta : any) =>{
                      repuesta.moves[2].move.name = respuesta.names[5].name;
                  })
                  }
                  if(repuesta.moves[3]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(repuesta.moves[3].move.url)
                    .subscribe((respuesta : any) =>{
                      repuesta.moves[3].move.name = respuesta.names[5].name;
                  })
                  }
                });
              this.pokemones.push(repuesta);
            });
    })
  }

  // getPoderes(res: any): any{
  //   this.pokemonService.buscarPoderesPokemones(res)
  //   .subscribe((respuesta: any)=>{
  //       this.pokemonService.buscarPoderesPokemones(respuesta.moves[0].move.url)
  //       .subscribe((respu: any) =>{
  //         respuesta.moves[0].move.name = respu.names[5].name;
  //       })
  //       return respuesta
  //   })
  // }

  getTipoPorBusqueda(res: any){
    this.pokemonService.buscarTipo(res.types[0].type.url)
          .subscribe((respuesta: any)=>{
            res.types[0].type.name = respuesta.names[4].name;
            if(res.types[1]?.type.url){
              this.pokemonService.buscarTipo(res.types[1]?.type.url)
                    .subscribe((respuesta: any)=>{
                      res.types[1].type.name = respuesta.names[4].name;
                    })
            }
            this.pokemonService.buscarPoderesPokemones(res.moves[0].move.url)
                  .subscribe((respuesta : any) =>{
                    res.moves[0].move.name = respuesta.names[5].name;
                  })
                  if(res.moves[1]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(res.moves[1].move.url)
                    .subscribe((respuesta : any) =>{
                      res.moves[1].move.name = respuesta.names[5].name;
                  })
                  }
                  if(res.moves[2]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(res.moves[2].move.url)
                    .subscribe((respuesta : any) =>{
                      res.moves[2].move.name = respuesta.names[5].name;
                  })
                  }
                  if(res.moves[3]?.move.url){
                    this.pokemonService.buscarPoderesPokemones(res.moves[3].move.url)
                    .subscribe((respuesta : any) =>{
                      res.moves[3].move.name = respuesta.names[5].name;
                  })
                  }
          });
  }
  buscarPokemon(valor: string) {
    if (valor.length > 0) {
      this.pokemones = [];
      this.pokemonService.buscarPokemoNombre(valor.toLowerCase()).subscribe(
        (res: any) => {
          this.getTipoPorBusqueda(res);
          this.pokemones.push(res);
        },
        err => {
          // alert(`Pokemon ${valor} no encontrado`);
          Swal.fire({
            imageUrl: 'https://stackblitz.com/files/angular-brr3ur/github/kmilo07/angular-pokemon/master/src/AC7G9BAL6NI7RTTW_400x220.jpg',
            title: '¿Quien es ese pokemon?',
            text: `El pokemon "${valor}" no se ha encontrado`
          })
        }
      );
    } else {
      this.getPokemons();
    }
  }
}
