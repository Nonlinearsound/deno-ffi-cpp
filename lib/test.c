#include <stdio.h>
#include <stdlib.h>
#include <Windows.h>

int main() {}

void HelloWorld() {
    printf("Hello from C for Deno\n");
}

void sleep(unsigned int time){
    Sleep(time);
}

char *sendMessage(const char *message) {
    printf("The message is: %s\n",message);
    return (char*)"This is the return fom C";
}

void mousePos(int *pos){
    POINT p;
    GetCursorPos(&p);

    pos[0] = p.x;
    pos[1] = p.y;
}