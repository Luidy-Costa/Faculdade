#include <stdio.h>
#include <stdlib.h>

    struct horario{
        int *phora;
        int *pmin;
        int *pseg;


    };

    typedef struct horario horario;

int main()
{
    int hora = 20;
    int min = 30;
    int seg = 47;

    horario h1;
    h1.phora = &hora;
    h1.pmin = &min;
    h1.pseg = &seg;

    printf("%d: %d: %d \n",*h1.phora, *h1.pmin, *h1.pseg);
}
