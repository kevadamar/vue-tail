<template>
  <div>
    <div class="pb-0">
      <div class="relative bg-white">
        <table class="w-full text-sm text-left">
          <thead class="text-xs text-left uppercase bg-gray-200 text-gray-500">
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
                    rules="required"
                    title="Description"
                    v-model="form.descriptionModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    @input="calculateTotal(idx, form)"
                    rules="required"
                    title="Qty"
                    type="number"
                    width="w-[5vw]"
                    v-model="form.qtyModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <search-select
                    rules="required"
                    width="min-w-[5vw]"
                    :data="allUom"
                    v-model="form.uomModel"
                    placeholder="Search"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    @input="calculateTotal(idx, form)"
                    rules="required"
                    title="Unit Price"
                    type="number"
                    width="w-[8vw]"
                    v-model="form.unitPriceModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    @input="calculateTotal(idx, form)"
                    rules="required"
                    title="0"
                    type="number"
                    width="w-[8vw]"
                    v-model="form.discountModel"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-input
                    @input="calculateTotal(idx, form)"
                    rules="required"
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
                    rules="required"
                    :data="allCurrency"
                    v-model="form.currencyModel"
                    @input="calculateTotal(idx, form)"
                    placeholder="Search"
                  />
                </td>
                <td class="py-4 pl-1 pr-3 text-right text-gray-400">
                  {{ formatingNumber({ value: form.vatTotal }) }}
                </td>
                <td class="py-4 pl-1 pr-3 text-right text-gray-400">
                  {{ formatingNumber({ value: form.subTotal }) }}
                </td>
                <td class="py-4 pl-1 pr-3 text-right text-gray-400">
                  {{ formatingNumber({ value: form.total }) }}
                </td>
                <td class="py-4 px-1">
                  <search-select
                    rules="required"
                    :data="allCharge"
                    v-model="form.chargeModel"
                    placeholder="Search"
                  />
                </td>
                <td class="py-4 px-1">
                  <app-button
                    width="w-[0.3]"
                    padding="px-2 py-1"
                    customColor="bg-gray-200 hover:bg-red-600 hover:border-red-600 hover:text-[#ffffff]"
                    @click="removeCost(idx, form)"
                  >
                    <h3 class="text-3xl">-</h3>
                  </app-button>
                </td>
              </tr>
            </template>
            <tr class="border-t-[1px]">
              <td colspan="7" rowspan="2">
                <div class="flex">
                  <span class="text-gray-500 pl-3">
                    Exchange Rate 1 USD =
                  </span>
                  <span
                    class="px-3 border-gray-200 bg-gray-200 text-gray-500 mx-[5px] rounded-[5px]"
                    >{{ rateAed }}</span
                  >
                  <span class="text-gray-500">AED</span>
                </div>
              </td>
              <td class="bg-gray-200">
                <p class="pl-3">AED in Total</p>
              </td>
              <td class="bg-gray-200">
                <p class="pr-3 text-right">
                  {{ formatingNumber({ value: aedTotal.vatTotal }) }}
                </p>
              </td>
              <td class="bg-gray-200">
                <p class="pr-3 text-right">
                  {{ formatingNumber({ value: aedTotal.subTotal }) }}
                </p>
              </td>
              <td class="bg-gray-200">
                <p class="pr-3 text-right">
                  {{ formatingNumber({ value: aedTotal.total }) }}
                </p>
              </td>
              <td></td>
              <td rowspan="2">
                <app-button
                  class="my-2 mr-1"
                  width="w-[0.3]"
                  padding="px-2 py-1"
                  customColor="bg-teal-300 border-teal-300 text-[#ffffff] hover:bg-gray-200 hover:border-gray-200 hover:text-black"
                  @click="addForm()"
                >
                  <h3 class="text-2xl">+</h3>
                </app-button>
              </td>
            </tr>
            <tr>
              <td class="bg-gray-200 border-t-white border-t-2">
                <p class="pl-3">USD in Total</p>
              </td>
              <td class="bg-gray-200 border-t-white border-t-2">
                <p class="pr-3 text-right">
                  {{ formatingNumber({ value: usdTotal.vatTotal }) }}
                </p>
              </td>
              <td class="bg-gray-200 border-t-white border-t-2">
                <p class="pr-3 text-right">
                  {{ formatingNumber({ value: usdTotal.subTotal }) }}
                </p>
              </td>
              <td class="bg-gray-200 border-t-white border-t-2">
                <p class="pr-3 text-right">
                  {{ formatingNumber({ value: usdTotal.total }) }}
                </p>
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
import { mapActions, mapState } from "vuex";

import { formatingNumber } from "@/utils/helpers";

export default {
  computed: {
    // map state store vuex
    ...mapState("currency", ["allCurrency"]),
    ...mapState("uom", ["allUom"]),
    ...mapState("charges", ["allCharge"]),
  },
  components: { AppInput, AppButton, ArrowRightFill, SearchSelect },
  name: "CostDetail",
  data: function () {
    return {
      formatingNumber,
      rateAed: 3.6725,
      forms: [
        // the model forms
        {
          currencyModel: { code: 1, label: "USD" },
          uomModel: "",
          chargeModel: "",
          qtyModel: "",
          vatModel: "",
          discountModel: "",
          descriptionModel: "",
          unitPriceModel: "",
          vatTotal: 0,
          subTotal: 0,
          total: 0,
        },
      ],
      aedTotal: {
        vatTotal: 0,
        subTotal: 0,
        total: 0,
      },
      usdTotal: {
        vatTotal: 0,
        subTotal: 0,
        total: 0,
      },
    };
  },
  mounted() {
    this.getListUom();
    this.getListCurrency();
    this.getListCharges();
  },
  methods: {
    // map actions store vuex
    ...mapActions("uom", ["getListUom"]),
    ...mapActions("currency", ["getListCurrency"]),
    ...mapActions("charges", ["getListCharges"]),

    addForm() {
      const findIsEmpty = this.forms.find(
        (form) =>
          !form.currencyModel ||
          !form.uomModel ||
          !form.chargeModel ||
          !form.qtyModel ||
          !form.vatModel ||
          !form.discountModel ||
          !form.descriptionModel ||
          !form.unitPriceModel
      );

      if (findIsEmpty) {
        alert("Please Fill Form");
        return;
      }

      this.forms.push({
        currencyModel: { code: 1, label: "USD" },
        uomModel: "",
        chargeModel: "",
        qtyModel: "",
        vatModel: "",
        discountModel: "",
        descriptionModel: "",
        unitPriceModel: "",
        vatTotal: 0,
        subTotal: 0,
        total: 0,
      });
    },
    updateValueCB(v) {
      this.currencyModel = v;
    },
    removeCost(idx, form) {
      this.forms.splice(idx, 1);
      this.calculateTotal(idx, form, "remove");
    },
    calculateTotal(numArray, object, flag = "new") {
      let aedVat = 0;
      let aedSubTotal = 0;
      let aedTotal = 0;
      let usdVat = 0;
      let usdSubTotal = 0;
      let usdTotal = 0;
      // if new calculate per row
      if (flag === "new") {
        // if currency null cant calculate
        if (!object.currencyModel?.label) {
          return;
        }

        let priceFix = object.unitPriceModel * object.qtyModel;

        if (object.currencyModel?.label === "AED") {
          priceFix = priceFix * this.rateAed;
        }
        const discount = priceFix * (object.discountModel / 100);
        const vat = priceFix * (object.vatModel / 100);
        const subTotal = priceFix - discount;
        const total = priceFix - discount + vat;

        this.forms[numArray].vatTotal = vat;
        this.forms[numArray].subTotal = subTotal;
        this.forms[numArray].total = total;
      }

      this.forms.map((form) => {
        let priceFixForm = 0;
        let discountForm = 0;
        let vatForm = 0;
        let subTotalForm = 0;
        let totalForm = 0;
        if (form.currencyModel?.label === "AED") {
          priceFixForm = form.unitPriceModel * form.qtyModel * this.rateAed;
          discountForm = priceFixForm * (form.discountModel / 100);
          vatForm = priceFixForm * (form.vatModel / 100);
          subTotalForm = priceFixForm - discountForm;
          totalForm = priceFixForm - discountForm + vatForm;

          aedVat += vatForm;
          aedSubTotal += subTotalForm;
          aedTotal += totalForm;
        } else {
          priceFixForm = form.unitPriceModel * form.qtyModel;
          discountForm = priceFixForm * (form.discountModel / 100);
          vatForm = priceFixForm * (form.vatModel / 100);
          subTotalForm = priceFixForm - discountForm;
          totalForm = priceFixForm - discountForm + vatForm;

          usdVat += vatForm;
          usdSubTotal += subTotalForm;
          usdTotal += totalForm;
        }
      });

      this.aedTotal.vatTotal = aedVat;
      this.aedTotal.subTotal = aedSubTotal;
      this.aedTotal.total = aedTotal;

      this.usdTotal.vatTotal = usdVat;
      this.usdTotal.subTotal = usdSubTotal;
      this.usdTotal.total = usdTotal;
    },
  },
};
</script>

<style></style>
