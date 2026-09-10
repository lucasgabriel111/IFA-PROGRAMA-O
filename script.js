/* =========================
   TAMANHO DA FONTE
   ========================= */

   let tamanhoFonte = 18;

   function aumentarFonte() {

        if (tamanhoFonte < 30) {
                    tamanhoFonte += 2;
                            document.body.style.fontSize = tamanhoFonte + "px";
        }
    }


    function diminuirFonte() {

            if (tamanhoFonte > 14) {
                        tamanhoFonte -= 2;
                                document.body.style.fontSize = tamanhoFonte + "px";
            }
        }


        /* =========================
           ALTO CONTRASTE
           ========================= */

           function altoContraste() {

                document.body.classList.toggle("alto-contraste");

           }


           /* =========================
              MODO DALTONISMO
              ========================= */

              function modoDaltonico() {

                    document.body.classList.toggle("daltonico");

              }


              /* =========================
                 LEITOR DE TEXTO
                 ========================= */

                 let vozAtual = null;


                 function lerTexto(botao) {

                        pararLeitura();

                            const card = botao.closest(".card, .hero, .sobre");

                                if (!card) {
                                            return;
                                }

                                    const texto = card.innerText;

                                        vozAtual = new SpeechSynthesisUtterance(texto);

                                            vozAtual.lang = "pt-BR";
                                                vozAtual.rate = 0.9;
                                                    vozAtual.pitch = 1;

                                                        speechSynthesis.speak(vozAtual);
                            }


                            /* =========================
                               LER A PÁGINA
                               ========================= */

                               function lerPagina() {

                                    pararLeitura();

                                        const texto = document.querySelector("main").innerText;

                                            vozAtual = new SpeechSynthesisUtterance(texto);

                                                vozAtual.lang = "pt-BR";
                                                    vozAtual.rate = 0.85;
                                                        vozAtual.pitch = 1;

                                                            speechSynthesis.speak(vozAtual);
                               }


                               /* =========================
                                  PARAR LEITURA
                                  ========================= */

                                  function pararLeitura() {

                                        if ("speechSynthesis" in window) {
                                                    speechSynthesis.cancel();
                                        }
                                    }


                                    /* =========================
                                       TECLA ESC PARA PARAR
                                       ========================= */

                                       document.addEventListener("keydown", function(event) {

                                            if (event.key === "Escape") {
                                                        pararLeitura();
                                            }

                                        });
                                            }
                                       })
                                        }
                                  }
                               }
                                }
                 }
              }
           }
            }
    }
        }
   }