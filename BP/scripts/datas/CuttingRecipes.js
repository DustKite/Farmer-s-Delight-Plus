export const CuttingBoardRecipes = [
    {
        ingredients: { item: "minecraft:pumpkin" },
        result: [
            { item: "minecraft:carved_pumpkin", count: 1 },
            { item: "minecraft:pumpkin_seeds", count: 4 }
        ],
        tool: { tag: "minecraft:is_shears" },
        is_block_type: true,
        sound: "use.wood"
    },
    {
        ingredients: { item: "minecraft:pufferfish" },
        result: [
            { item: "farmersdelightplus:pufferfish_slice", count: 2 },
            { item: "minecraft:bone_meal", count: 1 }
        ],
        tool: { tag: "farmersdelight:is_knife" },
        is_block_type: false,
        sound: "use.wood"
    },
    {
        ingredients: { item: "farmersdelightplus:rice_dough" },
        result: [
            { item: "farmersdelightplus:raw_rice_noodle", count: 1 }
        ],
        tool: { tag: "farmersdelight:is_knife" },
        is_block_type: false,
        sound: "use.wood"
    }
];