package cn.edu.whut.sept.zuul.entity;

import cn.edu.whut.sept.zuul.Game;
import cn.edu.whut.sept.zuul.Print;

import java.util.ArrayList;
import java.util.Random;
import java.util.Set;
import java.util.HashMap;

public class Room
{
    private int roomNum = 0;
    private String description;
    private HashMap<String, Room> exits;        // stores exits of this room.
    public ArrayList<Thing> things = new ArrayList<>();

    public Room(int roomNum, String description)
    {
        this.roomNum = roomNum;
        this.description = description;
        exits = new HashMap<>();
    }

    public void setExit(String direction, Room neighbor)
    {
        exits.put(direction, neighbor);
    }

    public String getShortDescription()
    {
        return description;
    }

    public String getLongDescription()
    {
        return "You are " + description + ".\n" + getExitString();
    }

    private String getExitString()
    {
        String returnString = "Exits:";
        Set<String> keys = exits.keySet();
        for(String exit : keys) {
            returnString += " " + exit;
        }
        return returnString;
    }


    public void showThings(Game game){
        Print.print("The things of this room have :");
        for (int i = 0; i < game.getCurrentRoom().things.size(); i++) {
            Print.print(game.getCurrentRoom().things.get(i).name + " " + game.getCurrentRoom().things.get(i).weight +"kg");
        }
    }

    public void transmission(Game game, int roomNum){

        for (int i = 0; i < game.rooms.size(); i++) {
            if(game.rooms.get(i).roomNum == roomNum){
                Room nextRoom = game.rooms.get(i);
                Room emRoom = game.getCurrentRoom();
                game.setCurrentRoom(nextRoom);
                Print.print("You are teleported to" + " " + game.getCurrentRoom().getShortDescription());
                Print.print(game.getCurrentRoom().getLongDescription());
            }
        }
    }

    public void randomTransfer(Game game){r
        int roomNum = random.nextInt(10) + 1;
        transmission(game, roomNum);
    }
    public int hasOneThing(String thing){

        for (int i = 0; i < things.size(); i++) {
            if(thing.equals(things.get(i).name)){
                return i;
            }
        }

        return -1;
    }

    public int getRoomNum() { return roomNum; }

    public Room getExit(String direction)
    {
        return exits.get(direction);
    }
}


