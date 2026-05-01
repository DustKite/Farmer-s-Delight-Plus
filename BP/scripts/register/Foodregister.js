var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { itemCompleteUseAfterEvent, world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";
export class FoodRegister {
    eat(args) {
        const itemStack = args.itemStack;
        const player = args.source;
        const useDuration = args.useDuration;
        if (itemStack && useDuration == 0) {
            switch (itemStack.typeId) {
                case "farmersdelightplus:berry_compote":
                case "farmersdelightplus:chilled_sweet_berry_juice":
                case "farmersdelightplus:cactus_tea":
                case "farmersdelightplus:call_of_the_seas":
                case "farmersdelightplus:honeyed_rice_with_berries":
                    player.addEffect('saturation', 60 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:miners_drink":
                    player.addEffect('haste', 60 * 20, { amplifier: 0 });
                    player.addEffect('night_vision', 60 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:pufferfish_slice":
                    player.addEffect('water_breathing', 30 * 20, { amplifier: 0 });
                    player.addEffect('hunger', 15 * 20, { amplifier: 1 });
                    player.addEffect('nausea', 15 * 20, { amplifier: 1 });
                    break;
                case "farmersdelightplus:cooked_pufferfish_slice":
                    player.addEffect('water_breathing', 60 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:shining_salad":
                    player.addEffect('night_vision', 300 * 20, { amplifier: 0 });
                    player.addEffect('regeneration', 60 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:rice_pilaf":
                case "farmersdelightplus:mashed_potatoes_with_meatballs":
                case "farmersdelightplus:risotto":
                    player.addEffect('saturation', 180 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:sparkling_potato":
                    player.addEffect('saturation', 180 * 20, { amplifier: 0 });
                    player.addEffect('fire_resistance', 60 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:turtle_soup":
                    player.addEffect('saturation', 300 * 20, { amplifier: 0 });
                    player.addEffect('regeneration', 60 * 20, { amplifier: 0 });
                    player.addEffect('water_breathing', 300 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:pho_soup":
                case "farmersdelightplus:lagman":
                case "farmersdelightplus:rice_with_frogspawn":
                case "farmersdelightplus:festive_porkchop_with_berries":
                case "farmersdelightplus:chocolate_glazed_chicken":
                case "farmersdelightplus:steak_with_golden_carrot":
                    player.addEffect('saturation', 300 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:glow_ink_pasta":
                    player.addEffect('saturation', 300 * 20, { amplifier: 0 });
                    player.addEffect('night_vision', 60 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:assorted_pufferfish_in_tomato_sauce":
                    player.addEffect('saturation', 300 * 20, { amplifier: 0 });
                    player.addEffect('water_breathing', 300 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:heart_of_the_minotaur":
                    player.addEffect('saturation', 900 * 20, { amplifier: 0 });
                    player.addEffect('strength', 120 * 20, { amplifier: 0 });
                    break;
                case "farmersdelightplus:honeyed_rice_with_dragon_egg":
                    player.addEffect('saturation', 900 * 20, { amplifier: 0 });
                    player.addEffect('health_boost', 600 * 20, { amplifier: 5 });
                    player.addEffect('strength', 600 * 20, { amplifier: 2 });
                    player.addEffect('resistance', 300 * 20, { amplifier: 0 });
                    player.addEffect('regeneration', 300 * 20, { amplifier: 2 });
                    player.addEffect('fire_resistance', 15 * 20, { amplifier: 0 });
                    break;
            }
        }
    }
}
__decorate([
    methodEventSub.register(world.afterEvents.itemCompleteUse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [itemCompleteUseAfteerEvent]),
    __metadata("design:returntype", void 0)
], FoodRegister.prototype, "eat", null);