void input() {
    wait(act_1)
    wait(input)
    存放过程
    signal(act_1)
    signal(output)
}

void output() {
    wait(act_2)
    wait(output)
    取出过程
    signal(act_2)
    signal(input)
}