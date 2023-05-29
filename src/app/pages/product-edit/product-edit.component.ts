import { Component } from '@angular/core';
import {FormBuilder,Validators} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/interfaces/Product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent {
  products!: IProduct
  productForm=this.formBuilder.group({
    name:['',[Validators.required,Validators.minLength(4)]],
    img:['',[Validators.required,Validators.minLength(4)]],
    price:[0]
  })
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: ActivatedRoute
  ){
    this.router.paramMap.subscribe((parmas=>{
      const id = Number(parmas.get('id'));
      this.productService.getProduct(id).subscribe(data=>{
        this.products=data
        this.productForm.patchValue({
          name: data.name,
          img:data.img,
          price: data.price
        })
      },error=>console.log(error.message)
      )
    }))
  }
  onHandleSubmit() {
    if(this.productForm.valid){
      const product:IProduct={
        id:this.products.id,
        name:this.productForm.value.name || "",
        img:this.productForm.value.img || "",
        price:this.productForm.value.price || 0,
      }
      this.productService.updateProduct(product).subscribe((product)=>{
        console.log("product",product);
        
      })
    }
  }
}
