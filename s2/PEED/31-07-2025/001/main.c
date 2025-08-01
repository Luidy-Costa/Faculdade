#include <stdio.h>
#include <stdlib.h>

struct horario {
     int hora,min,seg;
     };

typedef struct horario horario;

int main()
{
     horario agora, *h1;
     h1 = &agora;
     //(*h1).hora = 20;
     h1->hora = 20;
     h1->min = 53;
     h1->seg = 25;
     printf("%d: %d: %d",agora.hora,agora.min,agora.seg);

     horario h2;
     h2.hora=10 + h1->hora;
      printf("\n\n%d: %d: %d",h2.hora,h2.min,h2.seg);

}
