var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { world, system, GameMode, ItemStack, EquipmentSlot, StartupEvent, PlayerBreakBlockBeforeEvent } from "@minecraft/server";
import { ItemAPI } from "../lib/ItemAPI";
import { EventAPI } from "../lib/EventAPI";
import { takeEquippedItem } from "../lib/ItemUtil";
export class Pancake {
    constructor() {
        this.onPlayerInteract = this.onPlayerInteract.bind(this);
    }
    playerBreak(args) {
        const { block, itemStack, player } = args;
        if (!block.getTags().includes("farmersdelightplus:pancake")) return;
        const stage = block.permutation.getState('farmersdelightplus:pancake_stage');
        if (stage === undefined || stage === 0) return;
        args.cancel = true;
        const { dimension, location } = block;
        const dropId = block.typeId.replace("_block", "");
        system.runTimeout(() => {
            const isCreative = player?.getGameMode() === GameMode.Creative;
            if (!isCreative && itemStack) ItemAPI.damageItem(player, player.selectedSlotIndex);
            dimension.setBlockType(location, "minecraft:air");
            if (!isCreative) {
                dimension.spawnItem(new ItemStack(dropId, stage), { x: location.x + 0.5, y: location.y + 0.5, z: location.z + 0.5 });
            }
        }, 1);
    }
    onPlayerInteract(args) {
        const { block, player, dimension } = args;
        if (!player || !block.getTags().includes("farmersdelightplus:pancake")) return;
        const permutation = block.permutation;
        const state = permutation.getState('farmersdelightplus:pancake_stage');
        if (state === undefined) return;
        const { x, y, z } = block.location;
        const dropId = block.typeId.replace("_block", "");
        const pancakeStats = {
            "farmersdelightplus:honey_pancake": { hunger: 7, saturation: 5.0 },
            "farmersdelightplus:empty_pancake": { hunger: 4, saturation: 3.0 },
            "farmersdelightplus:chocolate_pancake": { hunger: 6, saturation: 6.0 },
            "farmersdelightplus:berry_pancake": { hunger: 5, saturation: 4.0 }
        };
        const stats = pancakeStats[dropId] || { hunger: 4, saturation: 3.0 };
        const isSneaking = player.isSneaking;
        const equipped = player.getComponent("equippable");
        const mainhand = equipped?.getEquipmentSlot(EquipmentSlot.Mainhand);
        const hasItem = mainhand?.hasItem();
        const itemTypeId = hasItem ? mainhand.typeId : null;
        if (!isSneaking && itemTypeId === dropId) {
            if (state < 16) {
                block.setPermutation(permutation.withState('farmersdelightplus:pancake_stage', state + 1));
                dimension.playSound("dig.cloth", { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
                if (player.getGameMode() !== GameMode.Creative) {
                    takeEquippedItem(player, EquipmentSlot.Mainhand, 1, false);
                }
            }
            return;
        }
        if (isSneaking && !hasItem) {
            dimension.playSound("dig.cloth", { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
            dimension.spawnItem(new ItemStack(dropId, 1), { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
            if (state <= 1) {
                dimension.setBlockType(block.location, "minecraft:air");
            } else {
                block.setPermutation(permutation.withState('farmersdelightplus:pancake_stage', state - 1));
            }
            return;
        }
        if (!isSneaking) {
            const hunger = player.getComponent('minecraft:player.hunger');
            dimension.playSound("random.eat", { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
            if (hunger) {
                hunger.setCurrentValue(Math.min(hunger.currentValue + stats.hunger, 20));
            }
            if (state <= 1) {
                dimension.setBlockType(block.location, "minecraft:air");
            } else {
                block.setPermutation(permutation.withState('farmersdelightplus:pancake_stage', state - 1));
            }
        }
    }
    register(args) {
        args.blockComponentRegistry.registerCustomComponent('farmersdelightplus:pancake', new Pancake());
    }
}
__decorate([
    EventAPI.register(world.beforeEvents.playerBreakBlock),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PlayerBreakBlockBeforeEvent]),
    __metadata("design:returntype", void 0)
], Pancake.prototype, "playerBreak", null);
__decorate([
    EventAPI.register(system.beforeEvents.startup),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StartupEvent]),
    __metadata("design:returntype", void 0)
], Pancake.prototype, "register", null);