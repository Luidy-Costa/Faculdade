#include <stdio.h>

int main(){
    float valgas;
    int gasmax;
    float gasatual;
    float gasfalta;
    float precopagar;

    printf("Nos diga quanto esta custando o preço da gasolina. \n");
    scanf("%f", &valgas);
    fflush(stdin);

    printf("nos diga qual e a capacidade maxima de armazenamento do seu tanque de cobustivel. \n");
    scanf("%d", &gasmax);
    fflush(stdin);

    printf("nos diga quanto de gasolina ha em seu tanque atualmente. \n");
    scanf("%f", &gasatual);
    fflush(stdin);

    gasfalta = gasmax - gasatual;
    precopagar = gasfalta * valgas;

    printf("vc deverá pagar %.2f pelos %.2fL de gasolina abastecidos", precopagar, gasfalta);



}
