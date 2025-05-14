#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <string.h>

/*Exercício 2: Faça um programa que prencha um m
quinze números, determine e mostre: o maior número e a
posição dele no vetor; ii) o menor número e a posição dele no
vetor.*/

#define TAM 5 //criação da variavel global para facilitar testes e modificações
int main(){
    setlocale(LC_ALL,"Portuguese"); //Comando da biblioteca locale.h para que seja aceito ABNT2
    int num[TAM];
    int maior,mai,menor,mei;

    printf("diga o 1º número\n");  //Primeira interação, fora do "for", para inicializar o valor das variaveis criadas evitando erros
    scanf("%d", &num[0]);
    fflush(stdin);
     maior = menor = mai = num[0];
     mei = 0;                    //mei=0 para salvar o indice da interação pre-loop

     for(int i = 1;i < TAM;i++){                 //entrada do loop
        printf("diga o %dº número\n", i+1);
        scanf("%d", &num[i]);
        fflush(stdin);

         if(num[i] >= maior){            //estrutura de decisão para encontrar o maior numero
            maior = num[i];
            mai = i;                   //para salvar o indice
         }else if(num[i] <= menor){
             menor = num[i];
             mei = i;
         }

     }

     printf("O menor número que temos é %d, que pode ser encontrado no índice %d do vetor \"num\" \n",menor,mei);
     printf("O maior número que temos é %d, que pode ser encontrado no índice %d do vetor \"num\" \n  ",maior,mai);

     return 0;

}
