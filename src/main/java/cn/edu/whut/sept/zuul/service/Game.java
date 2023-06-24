/**
 * 该类是“World-of-Zuul”应用程序的主类。
 * 《World of Zuul》是一款简单的文本冒险游戏。用户可以在一些房间组成的迷宫中探险。
 * 你们可以通过扩展该游戏的功能使它更有趣!.
 *
 * 如果想开始执行这个游戏，用户需要创建Game类的一个实例并调用“play”方法。
 *
 * Game类的实例将创建并初始化所有其他类:它创建所有房间，并将它们连接成迷宫；它创建解析器
 * 接收用户输入，并将用户输入转换成命令后开始运行游戏。
 *
 * @author  Michael Kölling and David J. Barnes
 * @version 1.0
 */
package cn.edu.whut.sept.zuul.service;

import cn.edu.whut.sept.zuul.Command.Command;
import cn.edu.whut.sept.zuul.entity.Player;
import cn.edu.whut.sept.zuul.entity.Room;
import cn.edu.whut.sept.zuul.entity.Thing;

import java.util.ArrayList;

public class Game
{
    private Room currentRoom;
    public ArrayList<Room> previousRoom = new ArrayList<>();
    public ArrayList<Room> rooms = new ArrayList<>();
    public int step = 0;
    private Parser parser;
    public Player player1 = new Player("abc",20);


    public Game()
    {
        createRooms();
        parser = new Parser();
    }

    private void createRooms()
    {
        Room outside, theater, pub, lab, office, schoolBuilding, canteen, library, dormitory, supermarket, random1, random2;

        // create the rooms
        outside = new Room(1,"outside the main entrance of the university");
        pub = new Room(2,"in the campus pub");
        theater = new Room(3,"in a lecture theater");
        lab = new Room(4,"in a computing lab");
        office = new Room(5,"in the computing admin office");
        schoolBuilding = new Room(6,"in the school building");
        canteen = new Room(7,"in the canteen");
        library = new Room(8,"in the library");
        dormitory = new Room(9,"in the dormitory");
        supermarket = new Room(10,"in the supermarket");
        random1 = new Room(11,"in the random room");
        random2 = new Room(12,"in the random room");

        rooms.add(outside);
        rooms.add(pub);
        rooms.add(theater);
        rooms.add(lab);
        rooms.add(office);
        rooms.add(schoolBuilding);
        rooms.add(canteen);
        rooms.add(library);
        rooms.add(dormitory);
        rooms.add(supermarket);
        rooms.add(random1);
        rooms.add(random2);

        Thing wine,water,wineTable,chopsticks,bowl,book,clothes,knife,pen,eraser,beaker,computer,phone,mac,eyeglasses;

        Thing cookie;
        cookie = new Thing("cookie",0.5);
        canteen.things.add(cookie);
        dormitory.things.add(cookie);

        wine = new Thing("wine",1);
        water = new Thing("water",0.5);
        wineTable = new Thing("wineTable",20);
        chopsticks = new Thing("chopsticks",0.2);
        bowl = new Thing("bowl",0.8);
        book = new Thing("book",2);
        clothes = new Thing("clothes",10);
        knife = new Thing("knife",4);
        pen = new Thing("pen",1);
        eraser = new Thing("eraser",2);
        beaker = new Thing("beaker",1);
        computer = new Thing("computer",15);
        phone = new Thing("phone",3);
        mac = new Thing("mac",5);
        eyeglasses = new Thing("eyeglasses",1);

        pub.things.add(wine);
        pub.things.add(water);
        pub.things.add(wineTable);
        canteen.things.add(chopsticks);
        canteen.things.add(bowl);
        library.things.add(book);
        dormitory.things.add(clothes);
        supermarket.things.add(knife);
        schoolBuilding.things.add(pen);
        schoolBuilding.things.add(eraser);
        lab.things.add(beaker);
        office.things.add(computer);
        office.things.add(phone);
        office.things.add(mac);
        theater.things.add(eyeglasses);

        // initialise room exits
        outside.setExit("east", theater);
        outside.setExit("south", lab);
        outside.setExit("west", pub);

        theater.setExit("west", outside);
        theater.setExit("south",random1);

        pub.setExit("east", outside);
        pub.setExit("west",canteen);

        canteen.setExit("south",library);
        canteen.setExit("east",pub);

        library.setExit("south",dormitory);
        library.setExit("north",canteen);
        library.setExit("east",random1);

        random2.setExit("west",library);

        dormitory.setExit("north",library);
        dormitory.setExit("east",supermarket);

        supermarket.setExit("west",dormitory);
        supermarket.setExit("east",schoolBuilding);

        schoolBuilding.setExit("west",supermarket);
        schoolBuilding.setExit("north",lab);

        lab.setExit("north", outside);
        lab.setExit("east", office);
        lab.setExit("south",schoolBuilding);

        office.setExit("west", lab);
        office.setExit("north",random1);

        random1.setExit("north",theater);

        currentRoom = outside;  // start game outside
    }

    public void play()
    {

        Print.printWelcome(this);

        // Enter the main command loop.  Here we repeatedly read commands and
        // execute them until the game is over.

        boolean finished = false;
        while (! finished) {
            Command command = parser.getCommand();
            if(command == null) {
                Print.print("I don't understand...");
            } else {
                finished = command.execute(this);
            }
        }

        Print.print("Thank you for playing.  Good bye.");
    }

    private void printWelcome()
    {
        System.out.println();
        System.out.println("Welcome to the World of Zuul!");
        System.out.println("World of Zuul is a new, incredibly boring adventure game.");
        System.out.println("Type 'help' if you need help.");
        System.out.println();
        System.out.println(currentRoom.getLongDescription());
    }


    public Room getCurrentRoom() {
        return currentRoom;
    }

    public void setCurrentRoom(Room room){
        this.currentRoom = room;
    }
}