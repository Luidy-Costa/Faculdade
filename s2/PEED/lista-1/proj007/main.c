#include <stdio.h>

int main (){
    float preco;
    int pag;
    int parc;

    do{
    printf("Qual o preco do produto selecionado? \n");
    scanf("%f", &preco);
    fflush(stdin);



        printf("qual seria a forma de pagamento?\n 1.A vista dinheiro ou cheque. \n 2.A vista no cartão de credito \n 3.parcelado em duas vezes \n 4.mais de duas vezes\n");
        scanf("%d", &pag);
        fflush(stdin);

        switch(pag){
            case 1:
                printf("O valor a ser pago e de %.2f \n\n",preco -(preco*0.15));
                break;
            case 2:
                printf("preco a ser pago eh de %.2f \n\n", preco -(preco*0.10));
                break;
            case 3:
                printf("preco total a ser pago eh de %.2f em 2 parcelas de %.2f  \n\n", preco, preco/2);
                break;
            case 4:
                printf("Em quantas parcelas gostaria de pagar? \n");
                scanf("%d", &parc);
                fflush(stdin);
                printf("preco total a ser pago eh de %.2f em %d parcelas de %.2f \n\n", preco + (preco*0.10), parc, (preco+(preco*0.10))/parc);
                break;
                }
    }while( preco != 0);
}
