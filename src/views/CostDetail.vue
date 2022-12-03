<template>
  <div>
    <div class="pb-0">
      <div class="relative bg-white">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-left text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-500"
          >
            <tr>
              <th scope="col" class="py-3 pl-2 pr-6">Description</th>
              <th scope="col" class="py-3 pl-2 pr-6 w-[5%]">Qty</th>
              <th scope="col" class="py-3 pl-2 pr-6">UOM</th>
              <th scope="col" class="py-3 pl-2 pr-6 w-[8%]">Unit Price</th>
              <th scope="col" class="py-3 pl-2 pr-6 w-[9%]">Discount (%)</th>
              <th scope="col" class="py-3 pl-2 pr-0">VAT (%)</th>
              <th scope="col" class="py-3 pl-2 pr-6"></th>
              <th scope="col" class="py-3 pl-2 pr-6">Currency</th>
              <th scope="col" class="py-3 pl-2 pr-6">VAT Amount</th>
              <th scope="col" class="py-3 pl-2 pr-6">Sub Total</th>
              <th scope="col" class="py-3 pl-2 pr-6">Total</th>
              <th scope="col" class="py-3 pl-2 pr-6">Charge To</th>
              <th scope="col" class="py-3 pl-2 pr-6" width="4%"></th>
            </tr>
          </thead>
          <tbody class="bg-white border-b border-l border-r">
            <template v-if="forms.length > 0">
              <tr v-for="(form, idx) in forms" :key="idx">
                <td class="py-4 px-1">
                  <app-input
                    title="Description"
                    v-model="form.descriptionModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    title="Qty"
                    type="number"
                    width="w-[5vw]"
                    v-model="form.qtyModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <search-select
                    width="min-w-[5vw]"
                    :data="uom.allUom"
                    v-model="form.uomModel"
                    placeholder="Search"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    title="Unit Price"
                    type="number"
                    width="w-[8vw]"
                    v-model="form.unitPriceModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    title="0"
                    type="number"
                    width="w-[8vw]"
                    v-model="form.discountModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    title="0"
                    type="number"
                    width="w-[8vw]"
                    v-model="form.vatModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <arrow-right-fill class="w-[2em] fill-gray-400" />
                </td>
                <td class="py-4 px-1">
                  <search-select
                    :data="currency.allCurrency"
                    v-model="form.currencyModel"
                    placeholder="Search"
                  />
                </td>
                <td class="py-4 pl-1 pr-3 text-right text-gray-400">0.00</td>
                <td class="py-4 pl-1 pr-3 text-right text-gray-400">0.00</td>
                <td class="py-4 pl-1 pr-3 text-right text-gray-400">0.00</td>
                <td class="py-4 px-1">
                  <search-select
                    :data="charges.allCharge"
                    v-model="form.chargeModel"
                    placeholder="Search"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-button
                    width="w-[0.3]"
                    padding="px-2 py-1"
                    customColor="bg-gray-200 hover:bg-red-600 hover:border-red-600 hover:text-[#ffffff]"
                    @click="forms.splice(idx, 1)"
                  >
                    <h3 class="text-3xl">-</h3>
                  </app-button>
                </td>
              </tr>
            </template>
            <tr>
              <td colspan="7" rowspan="2">
                <div class="flex">
                  <span class="text-gray-500 pl-3">
                    Exchange Rate 1 USD =
                  </span>
                  <span
                    class="px-3 border-gray-200 bg-gray-200 text-gray-500 mx-[5px] rounded-[5px]"
                    >3.6725</span
                  >
                  <span class="text-gray-500">AED</span>
                </div>
              </td>
              <td>
                <p class="pl-3">AED in Total</p>
              </td>
              <td>
                <p class="pr-3 text-right">0.00</p>
              </td>
              <td>
                <p class="pr-3 text-right">0.00</p>
              </td>
              <td>
                <p class="pr-3 text-right">0.00</p>
              </td>
              <td></td>
              <td rowspan="2">
                <app-button
                  class="my-2"
                  width="w-[0.3]"
                  padding="px-2 py-1"
                  customColor="bg-gray-200 hover:bg-teal-300 hover:border-teal-300 hover:text-[#ffffff]"
                  @click="addForm()"
                >
                  <h3 class="text-2xl">+</h3>
                </app-button>
              </td>
            </tr>
            <tr>
              <td>
                <p class="pl-3">USD in Total</p>
              </td>
              <td>
                <p class="pr-3 text-right">0.00</p>
              </td>
              <td>
                <p class="pr-3 text-right">0.00</p>
              </td>
              <td>
                <p class="pr-3 text-right">0.00</p>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import AppInput from "@/components/AppInput.vue";

import AppButton from "@/components/AppButton.vue";
import ArrowRightFill from "@/assets/icon/svg/ArrowRightFill.vue";
import SearchSelect from "@/components/SearchSelect.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currency", "uom", "charges"]),
  },
  components: { AppInput, AppButton, ArrowRightFill, SearchSelect },
  name: "CostDetail",
  data: function () {
    return {
      forms: [
        // the model forms
        // {
        //   currencyModel: "",
        //   uomModel: "",
        //   chargeModel: "",
        //   qtyModel: "",
        //   vatModel: "",
        //   discountModel: "",
        //   descriptionModel: "",
        //   unitPriceModel: "",
        // },
      ],
      value: "",
      show: "group",
    };
  },
  methods: {
    addForm() {
      this.forms.push({
        currencyModel: "",
        uomModel: "",
        chargeModel: "",
        qtyModel: "",
        vatModel: "",
        discountModel: "",
        descriptionModel: "",
        unitPriceModel: "",
      });
    },
    updateValueCB(v) {
      this.currencyModel = v;
    },
  },
};
</script>

<style></style>
