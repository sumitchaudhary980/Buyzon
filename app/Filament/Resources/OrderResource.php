<?php
namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Illuminate\Database\Eloquent\Builder;
use App\Enums\RolesEnum;
use Filament\Facades\Filament;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\SpatieMediaLibraryImageColumn;
use Filament\Tables\Table;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\DB;
use Filament\Pages\SubNavigationPosition;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart'; // Icon for Orders
    protected static SubNavigationPosition $subNavigationPosition = SubNavigationPosition::End;


    public static function table(Table $table): Table
    {
        return $table
            ->query(Order::where('status', 'paid')->with('orderItems')
            ->where('vendor_user_id', auth()->user()->id))
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('Order ID')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('shipping_status')
                    ->label('Shipping Status')
                    ->sortable(),
                SpatieMediaLibraryImageColumn::make('orderItems.product.variationImages')
                    ->collection('images')
                    ->limit(1)
                    ->conversion('thumb')
                    ->label('Images'),
                Tables\Columns\TextColumn::make('orderItems.product.title')
                    ->label('Product Name')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('orderItems')
                    ->label('Variations')
                    ->getStateUsing(function ($record) {
                        $orderItem = $record->orderItems->first();
                        $optionIds = $orderItem->variation_type_option_ids ?? [];
                        $optionIds = is_array($optionIds) ? $optionIds : json_decode($optionIds, true);

                        $variations = DB::table('variation_type_options')
                            ->whereIn('id', $optionIds)
                            ->get(['id', 'variation_type_id', 'name']);

                        $categorizedVariations = [];
                        foreach ($variations as $variation) {
                            $categorizedVariations[$variation->variation_type_id][] = $variation->name;
                        }

                        $displayVariations = [];
                        foreach ($categorizedVariations as $typeId => $variationNames) {
                            $variationType = DB::table('variation_types')->where('id', $typeId)->first();
                            if ($variationType) {
                                $typeName = ucfirst(strtolower($variationType->name));
                                $displayVariations[] = "{$typeName}: " . implode(', ', $variationNames);
                            }
                        }

                        return !empty($displayVariations) ? implode(' | ', $displayVariations) : '';
                    }),
                Tables\Columns\TextColumn::make('orderItems.quantity')
                    ->label('Quantity')
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_price')
                    ->label('Total Price')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.address_line_1')
                    ->label('Address Line 1')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.address_line_2')
                    ->label('Address Line 2')
                    ->default('Not Provided')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.city')
                    ->label('City')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.state')
                    ->label('State')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.zip_code')
                    ->label('Zip Code')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.country')
                    ->label('Country')
                    ->sortable(),
                Tables\Columns\TextColumn::make('address.delivery_instruction')
                    ->label('Delivery Instruction')
                    ->sortable()
                    ->default('No instructions available'),
            ])
            ->filters([
                // Define filters if needed
            ])
            ->actions([
                Tables\Actions\Action::make('shipped')
                    ->label('Mark as Shipped')
                    ->action(function (Order $record) {
                        $record->update(['shipping_status' => 'shipped']);
                        Notification::make()
                            ->title('Shipping Status Updated')
                            ->body('The order has been marked as shipped.')
                            ->success()
                            ->send();
                    })
                    ->color(fn(Order $record) => $record->shipping_status === 'placed' ? 'primary' : 'gray')  // Apply gray color if disabled
                    ->disabled(fn(Order $record) => $record->shipping_status !== 'placed')
                    ->icon('heroicon-o-truck'),  // Corrected icon

                Tables\Actions\Action::make('out_for_delivery')
                    ->label('Mark as Out for Delivery')
                    ->action(function (Order $record) {
                        $record->update(['shipping_status' => 'out for delivery']);
                        Notification::make()
                            ->title('Shipping Status Updated')
                            ->body('The order has been marked as out for delivery.')
                            ->success()
                            ->send();
                    })
                    ->color(fn(Order $record) => $record->shipping_status === 'shipped' ? 'success' : 'gray')  // Apply gray color if disabled
                    ->disabled(fn(Order $record) => $record->shipping_status !== 'shipped')
                    ->icon('heroicon-o-truck'),  // Corrected icon

                Tables\Actions\Action::make('delivered')
                    ->label('Mark as Delivered')
                    ->action(function (Order $record) {
                        $record->update(['shipping_status' => 'delivered']);
                        Notification::make()
                            ->title('Shipping Status Updated')
                            ->body('The order has been marked as delivered.')
                            ->success()
                            ->send();
                    })
                    ->color(fn(Order $record) => $record->shipping_status === 'out for delivery' ? 'secondary' : 'gray')  // Apply gray color if disabled
                    ->disabled(fn(Order $record) => $record->shipping_status !== 'out for delivery')
                    ->icon('heroicon-o-check-circle'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Add relationships for order items and address if needed
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }

    public static function canViewAny(): bool
    {
        $user = Filament::auth()->user();
        if (!$user) {
            return false;
        }
        return $user && $user->hasRole(RolesEnum::Vendor);
    }
}
