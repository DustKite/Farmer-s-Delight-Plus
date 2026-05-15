var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { system, GameMode, ItemStack, EquipmentSlot, StartupEvent } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { takeEquippedItem } from "../lib/ItemUtil";

export class BlockFoodRegister {
    onPlayerInteract(args) {
        const { block, player, dimension } = args;
        const permutation = block.permutation;
        const state = permutation.getState('farmersdelight:food_block_stage');
        if (state === undefined) return;
        const { x, y, z } = block.location;
        const dropId = block.typeId.replace("_block", "");
        const equipped = player.getComponent("equippable");
        const mainhand = equipped?.getEquipmentSlot(EquipmentSlot.Mainhand);
        const hasItem = mainhand?.hasItem();
        const itemStack = hasItem ? mainhand : null;
        const isMinotaur = block.typeId === "farmersdelightplus:heart_of_the_minotaur_block";
        const requiredItem = isMinotaur ? "farmersdelight:cooked_rice" : "minecraft:bowl";
        const translateKey = isMinotaur ? "farmersdelight.blockfood.farmersdelight:cooked_rice" : "farmersdelight.blockfood.minecraft:bowl";
        if (state >= 4) {
            dimension.setBlockType(block.location, "minecraft:air");
            dimension.playSound("dig.cloth", { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
            dimension.spawnItem(new ItemStack("minecraft:bowl", 1), { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
            return;
        }
        if (!itemStack || itemStack.typeId !== requiredItem) {
            player.onScreenDisplay.setActionBar({
                translate: translateKey
            });
            return;
        }
        block.setPermutation(permutation.withState('farmersdelight:food_block_stage', state + 1));
        dimension.playSound("dig.cloth", { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
        if (player.getGameMode() !== GameMode.Creative) {
            takeEquippedItem(player, EquipmentSlot.Mainhand, 1, false);
        }
        dimension.spawnItem(new ItemStack(dropId, 1), { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
    }
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('farmersdelightplus:blockfood', new BlockFoodRegister());
    }
}
__decorate([
    EventAPI.register(system.beforeEvents.startup),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StartupEvent]),
    __metadata("design:returntype", void 0)
], BlockFoodRegister.prototype, "register", null);