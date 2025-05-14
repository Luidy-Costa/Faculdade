#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <string.h>

/*Exerc�cio 2: Fa�a um programa que prencha um m
quinze n�meros, determine e mostre: o maior n�mero e a
posi��o dele no vetor; ii) o menor n�mero e a posi��o dele no
vetor.*/

#define TAM 5 //cria��o da variavel global para facilitar testes e modifica��es
int main(){
    setlocale(LC_ALL,"Portuguese"); //Comando da biblioteca locale.h para que seja aceito ABNT2
    int num[TAM];
    int maior,mai,menor,mei;

    printf("diga o 1� n�mero\n");  //Primeira intera��o, fora do "for", para inicializar o valor das variaveis criadas evitando erros
    scanf("%d", &num[0]);
    fflush(stdin);
     maior = menor = mai = num[0];
     mei = 0;                    //mei=0 para salvar o indice da intera��o pre-loop

     for(int i = 1;i < TAM;i++){                 //entrada do loop
        printf("diga o %d� n�mero\n", i+1);
        scanf("%d", &num[i]);
        fflush(stdin);

         if(num[i] >= maior){            //estrutura de decis�o para encontrar o maior numero
            maior = num[i];
            mai = i;                   //para salvar o indice
         }else if(num[i] <= menor){
             menor = num[i];
             mei = i;
         }

     }

     printf("O menor n�mero que temos � %d, que pode ser encontrado no �ndice %d do vetor \"num\" \n",menor,mei);
     printf("O maior n�mero que temos � %d, que pode ser encontrado no �ndice %d do vetor \"num\" \n  ",maior,mai);

     return 0;

}
