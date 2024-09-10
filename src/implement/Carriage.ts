export class Carriage {
   constructor(
      current_page: number,
      private width: number,
      private qty: number,
   ) {
      if (current_page < 1) throw new Error("Page can't be less than 1")
      this.start_index = (current_page - 1) * this.width
   }
   private start_index: number
   get LAST_INDEX() {
      return this.qty - 1
   }
   get bounds() {
      return [this.start_index, this.start_index + this.width] as const
   }
   get page() {
      return Math.ceil(this.start_index / this.width) + 1
   }

   shiftBy(n: number): void {
      const abs_shift_argument = Math.abs(n)
      const argument_sign = n < 0 ? -1 : 1

      let times = 0
      while (true) {
         if (times >= abs_shift_argument) break

         const supposed_step = this.start_index + this.width * argument_sign
         if (argument_sign === 1) {
            if (supposed_step > this.LAST_INDEX) break
         } else {
            if (supposed_step < 0) {
               this.start_index = 0
               break
            }
         }

         this.start_index = supposed_step
         times++
      }

   }

}