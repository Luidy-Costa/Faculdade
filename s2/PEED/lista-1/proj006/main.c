#include <stdio.h>

int main (){

    float preco;

    int pagamento;

    do{
        printf("Diga o preco do produto \n");
        scanf("%f", &preco);
        fflush(stdin);
        if(preco != 0){
            float desconto = preco*0.10;

            printf("Como deseja pagar? \n 1.Debito \n 2.Parcelado em duas vezes. \n");
            scanf("%d", &pagamento);
            fflush(stdin);

            if(pagamento == 1){
                printf("Com o desconto do pagamento a vista o preco a ser pago é de R$%.2f. \n",(preco - desconto));
            }else if(pagamento == 2){
                printf("Parcelado o valor a se pagar eh %.2f em duas parcelas de %.2f \n",preco, preco/2 );
            }else{
                printf("Opção invalida \n");
            }
        }
    }while(preco != 0);

    return 0;
}
