var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EntityEquippableComponent, EntityHurtAfterEvent, EquipmentSlot, world } from "@minecraft/server";
import { EventAPI } from "../lib/EventAPI";
import { ItemAPI } from "../lib/ItemAPI";
export class LootingRegister {
    looting(args) {
        const attacker = args.damageSource.damagingEntity;
        const victim = args.hurtEntity;
        if (!attacker || !victim)
            return;
        const equipment = attacker.getComponent(EntityEquippableComponent.componentId);
        if (!equipment)
            return;
        const mainHand = equipment.getEquipmentSlot(EquipmentSlot.Mainhand);
        const itemStack = mainHand.getItem();
        if (!itemStack?.getComponent("farmersdelight:increase_production"))
            return;
        const health = victim.getComponent('minecraft:health');
        if (health?.currentValue)
            return;
        switch (victim.typeId) {
            case 'minecraft:sheep': {
                const onFire = victim.getComponent('minecraft:onfire');
                const item = onFire != undefined
                    ? 'large_meals:cooked_mutton_rack'
                    : 'large_meals:raw_mutton_rack';
                ItemAPI.spawn(victim, item, 1);
                break;
            }
        }
    }
}
__decorate([
    EventAPI.register(world.afterEvents.entityHurt),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EntityHurtAfterEvent]),
    __metadata("design:returntype", void 0)
], LootingRegister.prototype, "looting", null);