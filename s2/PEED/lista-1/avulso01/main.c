#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

#define TAM 5

int main(){
 setlocale(LC_ALL,"Portuguese");

    int VETOR [TAM];

    for(int i = 0;i < TAM;i++){
        printf("Digite o %dº",i+1);
        scanf("%d", &VETOR[i]);
    }

    return 0;
}
