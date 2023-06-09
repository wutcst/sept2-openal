package cn.edu.whut.sept.zuul.Command;

import cn.edu.whut.sept.zuul.service.Game;

public abstract class Command
{
    private String secondWord;

    public Command()
    {
        secondWord = null;
    }

    public String getSecondWord()
    {
        return secondWord;
    }

    public boolean hasSecondWord()
    {
        return secondWord != null;
    }

    public void setSecondWord(String secondWord)
    {
        this.secondWord = secondWord;
    }

    public abstract boolean execute(Game game);
}
