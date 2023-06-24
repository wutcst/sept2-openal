package cn.edu.whut.sept.zuul.entity;

import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

import java.util.ArrayList;

public class Player {

    private String name;
    private double carryWeight;

    public double getCarryWeight() {
        return carryWeight;
    }

    public void setCarryWeight(double carryWeight) {
        this.carryWeight = carryWeight;
    }

    public ArrayList<Thing> things = new ArrayList<>();

    public Player(String name, double carryWeight){
        this.name = name;
        this.carryWeight = carryWeight;
    }

    public boolean isOverweight() {
        double sum = 0;
        for (int i = 0; i < things.size(); i++) {
            sum = sum + things.get(i).weight;
        }
        if(sum > carryWeight){
            return true;
        }
        return false;
    }

    public int hasOneThing(String thing){

        for (int i = 0; i < things.size(); i++) {
            if(thing.equals(things.get(i).name)){
                return i;
            }
        }

        return -1;
    }

    public void showThings(Game game){
        Print.print("The things of this player have :");
        for (int i = 0; i < game.player1.things.size(); i++) {
            Print.print(game.player1.things.get(i).name + " " + game.player1.things.get(i).weight +"kg");
        }
    }


}
