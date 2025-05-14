#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <string.h>

/*Exercício l: Faça um programa que preencha um vetor com 10
números reais, calcule e mostre a quantidade de números
negativos e a soma dos números positivos.*/
int main(){
    setlocale(LC_ALL,"Portuguese");
    int num[10];
    int soma = 0;
    int cont = 0;

    for(int i = 0; i < 10;i++){
        printf("digite o %dº número. \n",i+1);
        scanf("%d", &num[i]);
        fflush(stdin);

        if(num[i]<0){
           cont++;
        }else{
             soma +=num[i];
        }
    }

    system("cls");

    printf("Temos um total de %d números negativos a soma de todos os positivos equivalem a %d",cont,soma);

    printf("%d \n",num);

    return 0;
}
