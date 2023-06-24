package cn.edu.whut.sept.zuul.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Game {
    //物件的数量可以到前端生成
    private String gold_description; //金币的描述
    private Integer gold_weight; //金币的重量
    private String silver_description; //描述
    private Integer silver_weight;

    private String copper_description; //描述
    private Integer copper_weight;

    private Integer capacity; //玩家的负重能力
    private Integer magic_cookie; //魔法饼干可以增加的重量
}
