package com.company;

import java.util.Stack;

public class Main {

    public static char[][] TOKENS ={{'(',')'},{'[',']'},{'{','}'}};

    public static boolean isBalanced(String expression){
        Stack<Character> stack = new Stack<Character>();
        for(char c: expression.toCharArray()){
            if(isOpen(c)){
                stack.push(c);
            }
            else {
                if(stack.isEmpty() || !matches(stack.pop(),c))
                    return false;
            }
            
        }
        return stack.isEmpty();
    }

    private static boolean matches(char openT, char closedT) {
        for(char[] array: TOKENS){
            if(array[0]==openT){
                return array[1]==closedT;
            }
        }
        return false;
    }

    private static boolean isOpen(char c) {
        for(char[] array: TOKENS){
            if (array[0]==c){
                return true;
            }
        }
        return false;
    }

    public static void main(String[] args) {
        String[] balanced = new String[4];
        String[] unbalanced = new String[4];
        balanced[0] = "{[()[]]}()";
        balanced[1] = "[()]{()}";
        balanced[2] = "{}[]()";
        balanced[3] = "{[([{([{}])}])]}";
        unbalanced[0] = "[()";
        unbalanced[1] = "{}[](])";
        unbalanced[2] = "[(])";
        unbalanced[3] = "{[]}{[()}]";
        for(String expression: balanced){
            System.out.println(isBalanced(expression));
        }
        for(String expression: unbalanced){
            System.out.println(isBalanced(expression));
        }


    }
}
