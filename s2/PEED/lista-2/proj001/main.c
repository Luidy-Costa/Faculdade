#include <stdio.h>
#include <stdlib.h>
#include <locale.h>
#include <string.h>

#define TAM 5

int main(){
    setlocale(LC_ALL,"Portuguese");
    int num;
    int positivo[TAM];
    int cont = 0;

    for(int i = 0;i <TAM;i++){
        printf("diga o %dº número \n",i+1);
        scanf("%d", &num);
        system("cls");
        if(num > 0){
            positivo[cont] = num;
            cont++;
        }
    }
    for(int j = 0;j < cont;j++){
        printf("%d \t",positivo[j]);
    }

    return 0;
}
