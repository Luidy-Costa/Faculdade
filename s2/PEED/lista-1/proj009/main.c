#include <stdio.h>

int main(){
    int num[20];
    int maior, menor;
    char res;

    printf("Escreva o 1� numero \n");
    scanf("%d", &num[0]);
    fflush(stdin);
    maior = menor = num[0];

   for(int i = 1; i < 20;i++){

    printf("Escreva o %d� numero \n", i+1);
    scanf("%d", &num[i]);
    fflush(stdin);

    if(num[i] > maior){
        maior = num[i];
    }
    if(num[i] < menor){
        menor = num[i];
    }
   }

   printf("\n De todos os valores dados o Maior e o Menor s�o respectivamente:%d, %d \n", maior,menor);
   printf("Gostaria de ver todos os valores forenecidos?S/N:");
   scanf("%c", &res);
   fflush(stdin);

   if(res == 'S' || res == 's'){
    for(int j = 0; j < 20; j++){
        printf("%d ", num[j]);
    }

    return 0;
   }


}
