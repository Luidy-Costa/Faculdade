#include <stdio.h>
#include <stdlib.h>

#define TAM 5

int main()
{
    int num[TAM];
    int positivo[TAM];
    int cont = 0;

    for(int i = 0; i < TAM; i++){
        puts("digite um numero \n");
        scanf("%d", &num[TAM]);
        fflush(stdin);
    }

    for(int j = 0; j < TAM;j++){

        if(num[TAM] >=0){
            positivo[cont];
            cont++;
        }
    }
    puts("\n\n\nOs numeros positivos são");
    for(int a=0;a <= cont;a++){
        printf("%d \t", positivo[a]);
    }

    return 0;
}
