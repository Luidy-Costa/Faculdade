#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <string.h>

/*Exerc�cio l: Fa�a um programa que preencha um vetor com 10
n�meros reais, calcule e mostre a quantidade de n�meros
negativos e a soma dos n�meros positivos.*/
int main(){
    setlocale(LC_ALL,"Portuguese");
    int num[10];
    int soma = 0;
    int cont = 0;

    for(int i = 0; i < 10;i++){
        printf("digite o %d� n�mero. \n",i+1);
        scanf("%d", &num[i]);
        fflush(stdin);

        if(num[i]<0){
           cont++;
        }else{
             soma +=num[i];
        }
    }

    system("cls");

    printf("Temos um total de %d n�meros negativos a soma de todos os positivos equivalem a %d",cont,soma);

    printf("%d \n",num);

    return 0;
}
